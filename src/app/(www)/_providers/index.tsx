'use client'

import type { tNavFetchCTX } from 'www/_providers/_types'
import { AdminBarCTXProvider } from 'www/_providers/AdminBar'
import { FilterProvider } from 'www/_providers/Explorer'
import { NavCTXProvider } from 'www/_providers/Navigation'
import { PortalCTXProvider } from 'www/_providers/Portal'
import { UserProvider } from 'www/_providers/User'

export const Providers = ({ nav, children }: { nav: tNavFetchCTX; children: ReactNode }) => {
  return (
    <PortalCTXProvider>
      <UserProvider>
        <AdminBarCTXProvider>
          <NavCTXProvider fetchInit={nav}>
            <FilterProvider>{children}</FilterProvider>
          </NavCTXProvider>
        </AdminBarCTXProvider>
      </UserProvider>
    </PortalCTXProvider>
  )
}
