import type { CollectionBeforeDeleteHook } from 'payload'

export const deleteUserRoles: CollectionBeforeDeleteHook = async ({ id, req }) => {
  await req.payload.delete({
    collection: 'user-roles',
    where: {
      user: {
        equals: id,
      },
    },
  })
}
