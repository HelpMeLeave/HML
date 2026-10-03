import type { UserWithPillars } from '@/_components/AdminLayout/Sidebar/_types'
import type { SanitizedPermissions } from 'payload'
import { createContext } from 'react'

type SidebarCTX = {
  open: boolean
  toggle: (status?: boolean) => void
}

type ActionsCTX = {
  isOpen: boolean
  toggle: (status?: boolean) => void
}

type AuthCTX = {
  user: UserWithPillars | null
  permissions: SanitizedPermissions | null
}

export const LayoutCTX = createContext<{
  sidebar: SidebarCTX
  actions: ActionsCTX
  auth: AuthCTX
}>({
  sidebar: {
    open: false,
    toggle: () => {},
  },
  actions: {
    isOpen: false,
    toggle: () => {},
  },
  auth: {
    user: null,
    permissions: null,
  },
})
