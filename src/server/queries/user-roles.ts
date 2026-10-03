'use server'

import type { BasePayload, PayloadRequest } from 'payload'

export const hasManagementRole = async (
  userId: number,
  excludeRoleIds: (null | undefined | number)[] = [],
  payload: BasePayload,
  req?: PayloadRequest
) => {
  const userRoles = await payload.find({
    collection: 'user-roles',
    where: {
      user: {
        equals: userId,
      },
      'role.tier': {
        less_than_equal: 1,
      },
      'role.id': {
        not_in: excludeRoleIds,
      },
    },
    select: {
      role: true,
    },
    depth: 1,
    req,
  })

  return userRoles.totalDocs > 0
}
