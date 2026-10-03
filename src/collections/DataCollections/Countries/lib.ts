import type { CollectionAfterReadHook } from 'payload'

export const isoToString: CollectionAfterReadHook = ({ doc }) => {
  if (typeof doc?.id == 'string' || typeof doc?.id == 'number') {
    doc.idString = doc.id.toString()
  }
  return doc
}
