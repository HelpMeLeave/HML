import type { WorkflowRecordSlug } from '@/payload-types'
import { DateTime } from 'luxon'
import type { Data, PayloadRequest } from 'payload'
import type { Flow } from 'payload-workflow'

/** Who did something, and when. Each group that a row can carry brings its own, because a save that changes content and moves status involves two different people. */
export type Attribution = {
  at: string
  by?: number | null
  /** Separates "no authenticated user" from "we don't know". Seeds and scheduled work have no user, and that is a category rather than a gap. */
  system: boolean
}

/** The document's title paired with when the state was written, so a list of entries reads as a history rather than a column of ids. */
const entryTitle = (label: string | undefined, at: string) =>
  [label, DateTime.fromISO(at).toFormat('d LLL yyyy, HH:mm')].filter(Boolean).join(' · ')

/**
 * Write one history entry.
 *
 * **One row per save**, carrying whichever groups apply — a content change, a transition, or both. Nothing is minted that didn't happen, and the groups don't collide, so a save that does both is one row rather than two.
 *
 * Attribution is per group and deliberately not shared. `change` describes the state sitting in `snapshot`: who wrote it and when, read off the base's own pair rather than stamped from this request. `transition` describes the act of moving the document: who pressed, now. An edit displaces work someone else may have authored, and crediting the editor for it is the failure this trail exists to prevent.
 *
 * `req` is passed on so the insert joins the caller's transaction — a save that fails downstream takes its entry with it.
 */
export const mintEntry = async ({
  req,
  recordSlug,
  baseId,
  label,
  change,
  snapshot,
  transition,
  notes,
}: {
  req: PayloadRequest
  recordSlug: WorkflowRecordSlug
  baseId: number | string
  /** The document's title as it stood, so renaming it later doesn't rewrite its history. */
  label?: string
  /** Who authored the state in `snapshot`, and when. */
  change?: Attribution
  /** The state this save displaced. */
  snapshot?: Data
  transition?: Attribution & {
    from: Flow.STATUS
    to: Flow.STATUS
    /** Which affordance was taken, when an edge offers more than one. */
    actionKey?: string
  }
  notes?: string[]
}): Promise<number> => {
  // Named for the state the row is about: the content it holds if it holds any, otherwise the moment it recorded.
  const at = change?.at ?? transition?.at ?? DateTime.now().toISO()

  // The one cast in the write path. `data` is assembled from a mirrored schema that only exists at runtime, so it can't be typed against a specific collection's generated shape.
  const { id } = await req.payload.create({
    collection: recordSlug,
    data: {
      baseId,
      title: entryTitle(label, at),
      change,
      snapshot,
      transition,
      notes,
    },
    req,
    depth: 0,
    overrideAccess: true,
  } as Parameters<PayloadRequest['payload']['create']>[0])

  return id as number
}
