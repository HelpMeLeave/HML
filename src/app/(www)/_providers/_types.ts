import type { Content, User } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Dispatch, SetStateAction } from 'react'

export type tFilterCTX = {
  filters: unknown[]
  setFilters: Dispatch<SetStateAction<unknown[]>>
  local: {
    data: string[] | null
    setData: Dispatch<SetStateAction<string[] | null>>
  }
}

export type NavigationGroup = {
  url: string
  type: 'internal' | 'external'
  displayText: string
}

export type tNavFetchTopNavItem = Partial<NavigationGroup> & {
  displayText: string
  slug: string
  description?: string
  links: (NavigationGroup & { description?: string })[]
}

export type tNavFetchCTX = {
  footerLinks: NavigationGroup[]
  topNav: tNavFetchTopNavItem[]
  banner?: { url: string; tagline: DefaultTypedEditorState }
  year: number
  tp?: {
    title: string
    id: string
    description: string
    url?: string
  }[]
}

export type tPortalCTX = {
  portal: RefObject<HTMLDivElement>
}

export type tUserCTX = {
  user: Partial<User> | null
  setUser: (user: User) => void
}

type AdminData = {
  slug: string
  user: false | User
  id?: string | number
  flow?: Content['flow']
}

export type tAdminBarCTX = {
  data: AdminData | null
  setData: Dispatch<SetStateAction<AdminData | null>>
}
