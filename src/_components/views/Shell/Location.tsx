'use client'

import { usePathname } from 'next/navigation'

const getViewType = (area?: string, id?: string) =>
  Boolean(area) ?
    id ? 'doc'
    : 'list'
  : 'dashboard'

const getFocus = (focus: string) =>
  focus ?
    focus == 'create' ?
      focus
    : Number(focus)
  : undefined

const getSubview = (subview?: string, viewType?: string, focus?: string | number) => {
  if (!viewType) return
  if (subview) return subview
  if (focus == 'create') return focus
  if (viewType == 'doc') return 'edit'
}

export const LocationEl = () => {
  const [area, grp, focus, subview, ..._rest] = usePathname()
    .replace(/^\/admin\//, '')
    .split('/')

  type ParsedObj = {
    viewType?: 'doc' | 'list' | 'dashboard'
    area?: 'collection' | 'global'
    focus?: 'create' | number
    subview?: string
    grp?: string
    collection?: string
    global?: string
  }

  const parsed = {
    viewType: getViewType(area, focus),
    focus: getFocus(focus),
    area: area?.replace(/s$/, ''),
  } as ParsedObj

  parsed.subview = getSubview(subview, parsed.viewType, parsed.focus)
  if (parsed.area) parsed[parsed.area] = grp

  return (
    <span
      data-view-type={parsed.viewType}
      data-collection={parsed.collection}
      data-global={parsed.global}
      data-subview={parsed.subview}
      data-doc-id={parsed.focus == 'create' ? undefined : parsed.focus}
    />
  )
}
