import { normalizeCollectionID } from '@/lib/normalize'
import type { UserRole } from '@/payload-types'
import { hasManagementRole } from '@/server/queries/user-roles'
import { type CollectionAfterDeleteHook, type Operation } from 'payload'

const processIDs = (operation: Operation, data: Partial<UserRole>, originalDoc?: UserRole) => ({
  previousRoleID: operation == 'update' ? normalizeCollectionID(originalDoc?.role) : 99,
  currentRoleID: normalizeCollectionID(data.role),
  userID: normalizeCollectionID(data.user),
})

export const checkManagementTagsOnDelete: CollectionAfterDeleteHook<UserRole> = async ({
  doc,
  req,
}) => {
  const { currentRoleID, userID } = processIDs('delete', doc)
  if (userID) {
    if (await hasManagementRole(userID, [currentRoleID], req.payload, req)) {
      return
    }
    try {
      const userUpdate = await req.payload.update({
        collection: 'users',
        id: userID,
        data: {
          isDirector: false,
          isHead: false,
          isManagement: false,
        },
        req,
      })
      if (userUpdate) {
        console.info(`User ${userUpdate.id} updated`)
      }
    } catch (e) {
      console.warn(e)
    }
  }
}
