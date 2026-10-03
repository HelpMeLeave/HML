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

/** The anchor id a heading renders with. The outline links to this, so every heading converter and the outline must go through it. */
export const slugifyHeadingID = (node: SerializedLexicalNode) => slugify(headingPlainText(node))
