import { normalizeCollectionID } from '@/lib/normalize'
import {
  type NormalizeCollectionObjectReturn,
  normalizeCollectionObject,
} from '@/lib/normalize/normalizeCollectionObject'
import type { UserRole } from '@/payload-types'
import { hasManagementRole } from '@/server/queries/user-roles'
import {
  type CollectionAfterDeleteHook,
  type CollectionBeforeChangeHook,
  type Operation,
} from 'payload'

const processIDs = (operation: Operation, data: Partial<UserRole>, originalDoc?: UserRole) => ({
  previousRoleID: operation == 'update' ? normalizeCollectionID(originalDoc?.role) : 99,
  currentRoleID: normalizeCollectionID(data.role),
  userID: normalizeCollectionID(data.user),
})

export const addManagementTagsToUser: CollectionBeforeChangeHook<UserRole> = async ({
  data,
  req,
  originalDoc,
  operation,
}) => {
  if (!data) return
  const { previousRoleID, currentRoleID, userID } = processIDs(operation, data, originalDoc)

  if (previousRoleID != currentRoleID) {
    const { entry: role } = (await normalizeCollectionObject(
      data.role,
      'roles',
      req.payload,
      req
    )) as NormalizeCollectionObjectReturn<'roles'>

    if (userID && role) {
      const { tier } = role

      if (await hasManagementRole(userID, [previousRoleID, currentRoleID], req.payload, req)) return

      try {
        const userUpdate = await req.payload.update({
          collection: 'users',
          id: userID,
          data: {
            isDirector: tier == '0',
            isHead: tier == '1',
            isManagement: ['0', '1'].includes(tier),
          },
          req,
        })
        if (userUpdate) {
          console.log(`User ${userUpdate.id} updated`)
        }
      } catch (e) {
        console.warn(e)
      }
    }
  }
}

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
