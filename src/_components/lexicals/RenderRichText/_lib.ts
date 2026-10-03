import { getNodesFromRichText } from '@/lib/getNodesFromRichText'
import type { SerializedNodeBase } from '@payloadcms/richtext-lexical'
import type { SerializedRootNode } from '@payloadcms/richtext-lexical/lexical'

export const processCitations = (root: SerializedRootNode) => {
  let citations: SerializedNodeBase[] = []
  if (root)
    citations = getNodesFromRichText(
      root,
      (node) => node.type == 'citation',
      (node) => {
        ;(node as SerializedNodeBase).footNoteKey = String(citations.length + 1)
        return node
      }
    ) as SerializedNodeBase[]
  return { citations, hasCitations: citations.length > 0 }
}
