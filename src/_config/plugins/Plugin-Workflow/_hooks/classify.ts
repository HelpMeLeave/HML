import { isRecord } from '@/lib/normalize/is'
import type { Operation } from '@payloadcms/ui/providers/Operation'
import { isDeepStrictEqual } from 'node:util'
import type { Data } from 'payload'

export type SaveKind = 'create' | 'edit' | 'inert'

const at = (doc: Data, path: string[]): unknown =>
  path.reduce<unknown>((value, segment) => (isRecord(value) ? value[segment] : undefined), doc)

export const classify = ({
  operation,
  data,
  originalDoc,
  trackedPaths,
}: {
  operation: Operation
  data: Data
  /** The document as stored. Absent on a create. */
  originalDoc?: Data
  trackedPaths: string[]
}): SaveKind => {
  // A create carries authored content by definition — the row only exists because someone filled it in and saved.
  if (operation == 'create' || !originalDoc) return 'create'

  const changed = trackedPaths.some((path) => {
    const segments = path.split('.')

    return !isDeepStrictEqual(at(data, segments), at(originalDoc, segments))
  })

  return changed ? 'edit' : 'inert'
}
