import type { DuotoneTweaks } from './filter'

type SerializedNode = {
  type?: string
  id?: string
  fields?: { duotone?: DuotoneTweaks } | null
  children?: SerializedNode[]
}

/** Upload node id → its duotone tweaks as last saved, from the field's serialized initial value. */
export const savedTweaks = (value: unknown) => {
  const map: Record<string, DuotoneTweaks | undefined> = {}
  const walk = (node?: SerializedNode) => {
    if (!node) return
    if (node.type == 'upload' && node.id) map[node.id] = node.fields?.duotone ?? undefined
    node.children?.forEach(walk)
  }
  walk((value as { root?: SerializedNode } | null)?.root)
  return map
}
