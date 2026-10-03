'use client'

import { useContext, useEffect } from 'react'
import { getMeUser } from 'www/_lib/getMeUser'
import { UserCTX } from 'www/_providers/CTX'

export const useMe = () => {
  const { user, setUser } = useContext(UserCTX)

  useEffect(() => {
    const handleUser = async () => {
      const data = await getMeUser()
      if (data.user) {
        setUser(data.user)
      }
    }

    if (!user) {
      handleUser()
    }
  })

  return { user }
}
