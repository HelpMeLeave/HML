'use client'

import { LayoutCTX } from '@/_components/AdminLayout/CTX'
import { useContext } from 'react'

export const useLayoutWrapper = () => {
  const ctx = useContext(LayoutCTX)
  if (!ctx) {
    throw new Error('useLayoutWrapper cannot be used outside of the Layout Provider')
  }
  return ctx
}

export const useSidebar = () => {
  const ctx = useContext(LayoutCTX)
  if (!ctx) {
    throw new Error('useLayoutWrapper cannot be used outside of the Layout Provider')
  }
  return { ...ctx.sidebar, ...ctx.auth }
}

export const useActions = () => {
  const ctx = useContext(LayoutCTX)
  if (!ctx) {
    throw new Error('useLayoutWrapper cannot be used outside of the Layout Provider')
  }
  return { ...ctx.actions, ...ctx.auth }
}
