import { truthy } from '@/access/_lib/truthy'
import type { UserFn } from '@/access/_types'
import type { User } from '@/payload-types'

export const isDirector: UserFn = (user) => truthy(user?.isDirector)
export const isHead: UserFn = (user) => truthy(user?.isHead)
export const isManager: UserFn = (user) => truthy(user?.isManagement)

export const isNotDirector: UserFn = (user) => !isDirector(user)

export const isSelf = (user: User | null, asWhere = true) =>
  asWhere ?
    {
      id: {
        equals: user?.id ?? -1,
      },
    }
  : false
