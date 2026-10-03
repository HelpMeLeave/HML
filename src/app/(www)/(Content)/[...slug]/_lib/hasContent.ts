import type { Content, ContentSnapshot } from '@/payload-types'

export const hasContent = (
  totalDocs: number,
  doc: unknown
): doc is (Content | ContentSnapshot) & { id: number } => Boolean(doc && totalDocs > 0)
