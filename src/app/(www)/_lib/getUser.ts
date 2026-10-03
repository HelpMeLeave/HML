import type { User } from '@/payload-types'
import { getPayload } from '@/server/getPayload'
import { headers } from 'next/headers'

export const getUser = async () => {
  const payload = await getPayload()

  let user = null
  try {
    const userQry = (await payload.auth({ headers: await headers() }))?.user
    if (userQry) {
      user = {
        isDirector: userQry.isDirector,
        isManagement: userQry.isManagement,
        roles: userQry.roles?.docs,
      } as Partial<User>
    }
  } catch (e) {
    console.warn(e)
  } finally {
    return user
  }
}
