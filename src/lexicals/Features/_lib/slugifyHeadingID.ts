import type { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { slugify } from 'payload/shared'

/** A heading's text, as the outline shows it. */
export const headingPlainText = (node: SerializedLexicalNode) =>
  convertLexicalToPlaintext({
    data: {
      root: {
        format: 'start',
        indent: 0,
        type: 'root',
        version: 1,
        direction: 'ltr',
        children: [node],
      },
    },
  })

const slugifyHeadingID = (node: SerializedLexicalNode) => slugify(headingPlainText(node))

export const headingID = (node: SerializedLexicalNode & { headingId?: string }) =>
  node.headingId || slugifyHeadingID(node)

const HEADING_TYPES = new Set(['section-heading', 'subsection-heading', 'h4'])

export const assignHeadingIds = <T>({ value }: { value?: T }): T | undefined => {
  if (!value || typeof value != 'object' || !('root' in value)) return value
  const used = new Map<string, number>()

  const walk = (node: SerializedLexicalNode & { headingId?: string; children?: unknown }) => {
    if (HEADING_TYPES.has(node.type)) {
      const base = slugifyHeadingID(node)
      if (base) {
        const seen = used.get(base) ?? 0
        used.set(base, seen + 1)
        node.headingId = seen == 0 ? base : `${base}-${seen + 1}`
      } else {
        delete node.headingId
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(walk)
  }

  walk((value as { root: SerializedLexicalNode }).root)
  return value
}
