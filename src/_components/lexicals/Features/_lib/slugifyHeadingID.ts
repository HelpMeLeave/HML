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

/** A heading's id worked out from its text alone. Only the save hook and the fallback below should call this. */
export const slugifyHeadingID = (node: SerializedLexicalNode) => slugify(headingPlainText(node))

/** The anchor id a heading renders with. The outline links to this, so every heading converter and the outline must go through it. */
// docs saved before headingId existed fall back to the text, as before (no -2 suffixes until they're saved again)
export const headingID = (node: SerializedLexicalNode & { headingId?: string }) =>
  node.headingId || slugifyHeadingID(node)

// the nodes that register the flat `headingId` state (see nodeStates.ts); any other node would drop it on its next trip through the editor
const HEADING_TYPES = new Set(['section-heading', 'subsection-heading', 'h4'])

/**
 * Field hook: stores each heading's id on save, worked out from its text every time.
 * Repeats in the same doc get -2, -3, … so every TOC link lands on its own heading.
 */
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
