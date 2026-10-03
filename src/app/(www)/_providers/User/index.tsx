'use client'

import type { User } from '@/payload-types'
import { useCallback, useMemo, useState } from 'react'
import { UserCTX } from 'www/_providers/CTX'

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<Partial<User> | null>(null)
  const setUser = useCallback((user: User | null) => setUserState(user), [])

  const val = useMemo(
    () => ({
      user,
      setUser,
    }),
    [setUser, user]
  )

  return <UserCTX.Provider value={val}>{children}</UserCTX.Provider>
}
