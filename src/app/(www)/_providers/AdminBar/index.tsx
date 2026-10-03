'use client'

import { AdminBar } from '@/components/AdminTopBar'
import { useMemo, useState } from 'react'
import type { tAdminBarCTX } from 'www/_providers/_types'
import { AdminBarCTX } from 'www/_providers/CTX'

export const AdminBarCTXProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<tAdminBarCTX['data'] | null>(null)

  const adminData = useMemo(() => {
    return {
      data,
      setData,
    }
  }, [data])

  return (
    <AdminBarCTX.Provider value={adminData}>
      {adminData.data && <AdminBar {...adminData.data} />}
      {children}
    </AdminBarCTX.Provider>
  )
}
