import { fromCamelCase } from '@/lib/textCasing'
import type { Tag } from '@/payload-types'

export const normalize = (val: (number | Tag)[] | null | undefined): number[] =>
  (val ?? []).map((v) => (typeof v === 'number' ? v : v.id))

export const asOption = (tags: Tag[]) =>
  tags.map((t) => ({
    value: t.title,
    label: t.display ?? fromCamelCase(t.title),
  }))

export const asValue = (tags: Tag[]) => tags.map((t) => t.title)

export const grpHasTag = (tagGrp?: Tag[], tag?: Tag | string) =>
  tagGrp?.some((o) => (typeof tag == 'string' ? o.title == tag : o.id == tag?.id)) ?? false

export const clearDescendants = (removed: Tag[], allTags: Tag[]): Tag[] => {
  const removedTitles = new Set(removed.map((t) => t.title))
  const descendants = allTags.filter((t) => t.parentTitle?.some((p) => removedTitles.has(p)))
  if (!descendants.length) return []
  return [...descendants, ...clearDescendants(descendants, allTags)]
}
