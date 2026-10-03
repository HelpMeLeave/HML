import { env } from '@/env'
import type { User } from '@/payload-types'
import { sdk } from '@/server/sdk'

const getMe = async (...select: Array<keyof User>): Promise<User | null> => {
  let fetcher = `${env.NEXT_PUBLIC_BASE_URL}/api/users/me`
  if (select && select.length > 0) {
    fetcher += '?' + select.map((key) => `select[${key}]=true`).join('&')
  }
  const data = await sdk.fetch(fetcher)
  if (data.ok) {
    return (await data.json()).user
  }
  return null
}

const getMyID = async (): Promise<number | null> => (await getMe('id'))?.id || null

export const deleteMyPreferences = async (): Promise<false | number> => {
  const userId = await getMyID()
  const deleteQry =
    userId
    && (await sdk.delete({
      collection: 'payload-preferences',
      where: {
        'user.value': {
          equals: userId,
        },
      },
    }))
  if (deleteQry) {
    return deleteQry.docs.length
  }
  return false
}
