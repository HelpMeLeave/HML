import type {
  SerializedLexicalNode,
  SerializedTextNode,
} from '@payloadcms/richtext-lexical/lexical'

type RichText = { root: { children: SerializedLexicalNode[] } } | null | undefined

type PreviewOptions = {
  maxLength?: number
}

// Never walked into: no preview text lives in these
const SKIPPED_TYPES = new Set(['block', 'upload', 'relationship', 'table', 'horizontalrule'])

const hasChildren = (
  node: SerializedLexicalNode
): node is SerializedLexicalNode & { children: SerializedLexicalNode[] } =>
  Array.isArray((node as { children?: unknown }).children)

const toText = (node: SerializedLexicalNode): string => {
  if (node.type == 'linebreak' || node.type == 'tab') return ' '
  if (hasChildren(node)) return node.children.map(toText).join('')
  return (node as SerializedTextNode).text ?? ''
}

// Only paragraphs count, so headings, eyebrows and list items stay out of the preview
const paragraphs = (node: SerializedLexicalNode): string[] => {
  if (node.type == 'paragraph') return [toText(node).replace(/\s+/g, ' ').trim()]
  if (SKIPPED_TYPES.has(node.type) || !hasChildren(node)) return []
  return node.children.flatMap(paragraphs)
}

/**
 * One preview for every card and meta description: the editor-written subtitle first, then the content's opening paragraphs, cut at a word with `…`.
 * Pass the fields in the order they should read, e.g. `getPreview([subtitle, content])`.
 */
export const getPreview = (fields: RichText[], { maxLength = 160 }: PreviewOptions = {}) => {
  let preview = ''

  for (const text of fields.flatMap((field) => field?.root.children.flatMap(paragraphs) ?? [])) {
    if (!text) continue
    // a subtitle often has no closing punctuation; without one it would run into the next sentence
    preview = !preview ? text : `${preview}${/[.!?…:]$/.test(preview) ? ' ' : '. '}${text}`
    if (preview.length >= maxLength) break
  }

  if (preview.length <= maxLength) return preview

  const cut = preview.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.—–-]+$/, '')}…`
}
