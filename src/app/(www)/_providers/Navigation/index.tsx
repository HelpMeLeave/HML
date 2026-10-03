'use client'

import type { tNavFetchCTX } from '@/app/(www)/_providers/_types'
import { useMemo } from 'react'
import { NavCTX } from 'www/_providers/CTX'

export const NavCTXProvider = ({
  fetchInit,
  children,
}: {
  fetchInit: tNavFetchCTX
  children: ReactNode
}) => {
  const nav = useMemo(
    () => ({
      ...fetchInit,
    }),
    [fetchInit]
  )

  return <NavCTX.Provider value={nav}>{children}</NavCTX.Provider>
}
