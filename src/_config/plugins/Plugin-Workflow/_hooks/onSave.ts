import { checkAccessGate } from '@/_config/plugins/Plugin-Workflow/_hooks/checkAccessGate'
import { checkForBy } from '@/_config/plugins/Plugin-Workflow/_hooks/checkForBy'
import { classify } from '@/_config/plugins/Plugin-Workflow/_hooks/classify'
import { createPushFn } from '@/_config/plugins/Plugin-Workflow/_hooks/createPushFn'
import { deleteExcessKeys } from '@/_config/plugins/Plugin-Workflow/_hooks/deleteExcessKeys'
import { updateLifecycle } from '@/_config/plugins/Plugin-Workflow/_hooks/updateLifecycle'
import { type Attribution, mintEntry } from '@/_config/plugins/Plugin-Workflow/_lib/entries'
import { isLockedAt } from '@/_config/plugins/Plugin-Workflow/_lib/is'
import type { FlowButton, FlowPermissions } from '@/_config/plugins/Plugin-Workflow/_lib/parseFlow'
import { createRecordTitleCall } from '@/_config/plugins/Plugin-Workflow/collections/_lib'
import type {
  WorkflowCollections,
  WorkflowCollectionSlug,
  WorkflowRecordSlug,
} from '@/payload-types'
import { DateTime } from 'luxon'
import {
  type CollectionBeforeChangeHook,
  type PayloadRequest,
  type RequestContext,
  APIError,
} from 'payload'
import type { Flow, WorkflowCollection } from 'payload-workflow'

export type OnSaveHookProps = {
  collection: WorkflowCollection.PreprocessedConfig
  baseSlug: string
  recordSlug: WorkflowRecordSlug
  buttons: Record<Flow.STATUS, FlowButton[]>
  initStatus: Flow.STATUS
  permissions: FlowPermissions
  trackedPaths: string[]
  locksAt?: Flow.LocksAt
}

const checkAffordance = ({
  buttons,
  transitionTo,
  from,
  actionKey,
  bySystem,
  permissions,
  req,
  note,
}: {
  buttons: Record<Flow.STATUS, FlowButton[]>
  transitionTo: Flow.STATUS
  from: Flow.STATUS
  actionKey?: string | null
  bySystem: boolean
  permissions: FlowPermissions
  req: PayloadRequest
  note?: string
}) => {
  const affordance = buttons[from]?.find(
    (button) =>
      button.to == transitionTo && (actionKey == undefined || button.admin?.actionKey == actionKey)
  )

  if (!affordance)
    throw new APIError(`PluginWorkflow: '${from}' → '${transitionTo}' is not a declared edge.`, 400)

  const edgeSize = buttons[from].filter((button) => button.to == transitionTo).length
  if (edgeSize > 1 && actionKey == undefined)
    throw new APIError(
      `PluginWorkflow: '${from}' → '${transitionTo}' has several actions and needs an actionKey.`,
      400
    )

  if (affordance.admin?.requireNotes && !note)
    throw new APIError(`PluginWorkflow: '${affordance.btnLabel}' requires a note.`, 400)

  if (
    !bySystem
    && !checkAccessGate({
      permissions,
      from,
      requested: transitionTo,
      actionKey,
      req,
    })
  )
    throw new APIError(
      `Plugin-Workflow: not permitted to take '${from}' → '${transitionTo}'${actionKey ? ` as '${actionKey}'` : ''}.`,
      403
    )
}

export const onSave = ({
  collection,
  baseSlug,
  recordSlug,
  buttons,
  initStatus,
  permissions,
  trackedPaths,
  locksAt,
}: OnSaveHookProps): CollectionBeforeChangeHook => {
  const getTitle = createRecordTitleCall(collection)

  return async (props: {
    req: PayloadRequest
    context: RequestContext
    data: Partial<WorkflowCollections[WorkflowCollectionSlug]>
    operation: 'create' | 'update'
    originalDoc?: Partial<WorkflowCollections[WorkflowCollectionSlug]>
  }) => {
    const { data, req, originalDoc, context } = props
    const { flow: from, id: baseId, currentLifecycle: originalLifecycle } = props.originalDoc ?? {}
    const { transitionTo, actionKey, transitionNote } = data

    const changedBy = req.user?.id
    const changedAt = DateTime.now().toISO()
    const bySystem = Boolean(context.workflow?.bySystem)
    const note = transitionNote?.trim()
    const saveType = classify({ ...props, trackedPaths })
    const displacedChange = originalLifecycle?.changed

    deleteExcessKeys(data)
    checkForBy({ baseSlug, bySystem, changedBy })
    const pushFn = createPushFn(data, originalDoc)

    const change =
      saveType == 'edit' ?
        {
          at: (displacedChange?.at as string) ?? changedAt,
          by: (displacedChange?.by as number | undefined) ?? null,
          system: !displacedChange?.by,
        }
      : undefined

    if (change) data.flow = initStatus
    if (baseId) {
      const isPublishing = transitionTo == 'published'
      let entry: number = -1
      if (transitionTo) {
        if (from) {
          checkAffordance({
            transitionTo,
            from,
            bySystem,
            note,
            buttons,
            permissions,
            actionKey,
            req,
          })
          const qryChange: Attribution = {
            system: bySystem,
            ...(isPublishing ? (change ?? displacedChange) : change),
          } as Attribution

          entry = await mintEntry({
            req,
            recordSlug,
            baseId,
            label: getTitle(data) ?? getTitle(originalDoc),
            snapshot:
              isPublishing ? { ...originalDoc, ...data }
              : change ? originalDoc
              : undefined,
            change: qryChange,
            transition: {
              at: changedAt,
              by: changedBy,
              system: bySystem,
              from,
              to: transitionTo,
              actionKey: actionKey ?? undefined,
            },
            notes: note ? [note] : undefined,
          })

          data.flow = transitionTo
        }
      } else if (change) {
        entry = await mintEntry({
          req,
          recordSlug,
          baseId,
          label: getTitle(originalDoc),
          snapshot: originalDoc,
          change,
        })
      }
      entry >= 0 && pushFn(entry)
      if (isPublishing) data.currentLifecycle = updateLifecycle(data, { published: entry })
    }

    if (saveType != 'inert')
      data.currentLifecycle = updateLifecycle(data, {
        changed: {
          at: changedAt,
          by: changedBy ?? null,
        },
      })

    data.currentLifecycle = updateLifecycle(data, {
      locked: isLockedAt({ locksAt, flow: data.flow! }),
    })

    return data
  }
}
