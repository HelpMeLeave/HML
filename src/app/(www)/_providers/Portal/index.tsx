'use client'

import { useMemo, useRef } from 'react'
import { PortalCTX } from 'www/_providers/CTX'

export const PortalCTXProvider = ({ children }: Props) => {
  const portalRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement)

  const val = useMemo(
    () => ({
      portal: portalRef,
    }),
    []
  )

  return (
    <PortalCTX value={val}>
      {children}
      <div
        ref={portalRef}
        className='portal fixed top-0 left-0 z-999'
      />
    </PortalCTX>
  )
}
