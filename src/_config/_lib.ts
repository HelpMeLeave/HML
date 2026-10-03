import type { CollectionConfig, GlobalConfig } from 'payload'

type Groups = (typeof NavGroups)[number]
type ItemT<T extends 'global' | 'collection'> =
  T extends 'global' ? GlobalConfig
  : T extends 'collection' ? CollectionConfig
  : never

export const NavGroups = [
  'Finances',
  'Content',
  'Content Utilities',
  'Media',
  'Volunteer Management',
  'Website Settings',
] as const

const setNavGroup = <T extends CollectionConfig | GlobalConfig>(group: Groups, item: T) => {
  if (!item.admin) item.admin = {}
  if (item.admin.group == false) return item
  item.admin!.group = group
  return item
}
const setTimestamp = (item: CollectionConfig) => {
  item.timestamps = typeof item.timestamps != 'boolean' ? false : item.timestamps
  return item
}

// #region ! ---------- HELPERS ----------
const isCollection = (
  item: ItemT<'collection' | 'global'>,
  type: 'collection' | 'global'
): item is CollectionConfig => {
  return type == 'collection'
}
// #endregion ! --------------------

const setItem = <T extends 'global' | 'collection'>(group: Groups, type: T, item: ItemT<T>) => {
  item = setNavGroup<ItemT<T>>(group, item)
  if (isCollection(item, type)) setTimestamp(item)
  return item
}
const setGroup = <T extends 'global' | 'collection'>(group: Groups, type: T, items: ItemT<T>[]) =>
  items.map((item) => setItem(group, type, item))

export const setCollectionGroup = (group: Groups, items: CollectionConfig[]) =>
  setGroup(group, 'collection', items)

export const setGlobalGroup = (group: Groups, items: GlobalConfig[]) =>
  setGroup(group, 'global', items)
