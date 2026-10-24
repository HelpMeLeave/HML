'use client'

import { AdminBar } from '@/components/AdminTopBar'
import { useMe } from '@/hooks/useMe'
import type { User } from '@/payload-types'
import { useMemo, useState } from 'react'
import type { tAdminBarCTX } from 'www/_providers/_types'
import { AdminBarCTX } from 'www/_providers/CTX'

export const AdminBarCTXProvider = ({
  user: initUser,
  children,
}: {
  user?: Nullish<User>
  children: ReactNode
}) => {
  const { user: qryUser } = useMe()

  const dataUser = useState<Nullish<Partial<User>>>(qryUser)
  const [data, setData] = useState<tAdminBarCTX['data'] | null>(null)

  const adminData = useMemo(
    () => ({
      data,
      setData,
    }),
    [data]
  )

  const { user, setUser } = useMemo(() => ({ user: dataUser[0], setUser: dataUser[1] }), [initUser])

  return (
    <AdminBarCTX.Provider value={adminData}>
      <AdminBar
        {...adminData.data}
        user={user}
        setUser={setUser}
      />

      {children}
    </AdminBarCTX.Provider>
  )
}
