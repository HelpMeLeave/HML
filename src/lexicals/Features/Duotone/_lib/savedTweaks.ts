import type { DuotoneFields, DuotoneTweakFields } from '@/lexicals/Features/Duotone/_types'
import type { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

type SerializedNode = SerializedLexicalNode & {
  id: string
  fields: DuotoneFields
  children: SerializedNode[]
}

export const savedTweaks = (value: unknown) => {
  const map: Record<string, DuotoneTweakFields | undefined> = {}
  const walk = (node?: SerializedNode) => {
    if (!node) return
    if (node.type == 'upload' && node.id) map[node.id] = node.fields?.duotone ?? undefined
    node.children?.forEach(walk)
  }
  walk((value as { root: SerializedNode } | null)?.root)
  return map
}
