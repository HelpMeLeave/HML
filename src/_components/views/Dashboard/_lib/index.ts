import { DirectorsOnlySlugs } from '@/_components/views/Dashboard/_lib/DirectorsOnlySlugs'
import { PillarOnlySlugs } from '@/_components/views/Dashboard/_lib/PillarOnlySlugs'
import { isPillar } from '@/access/PillarTeam'
import { isDirector } from '@/access/_primitives'
import type {
  CollectionSlug,
  GlobalSlug,
  SanitizedCollectionPermission,
  SanitizedGlobalPermission,
  SanitizedPermissions,
} from 'payload'

export type AccessPermissionsFnReturn = {
  globals: Record<GlobalSlug, boolean>
  collections: Record<CollectionSlug, boolean>
}

export const getAccessPermissions = (
  user: { isDirector: boolean; isManagement?: boolean | null },
  permissions?: SanitizedPermissions
) =>
  Object.fromEntries(
    Object.entries(permissions ?? {}).map(([type, items]) => {
      return [type, parsePermissions(user, items)]
    })
  ) as {
    globals: Record<GlobalSlug, boolean>
    collections: Record<CollectionSlug, boolean>
  }

export const parsePermissions = (
  user: { isDirector: boolean },
  items:
    | boolean
    | {
        [collectionSlug: string]: SanitizedCollectionPermission
      }
    | {
        [globalSlug: string]: SanitizedGlobalPermission
      }
) =>
  Object.fromEntries(
    Object.entries(items).map(([slug, details]) => {
      const thisSlug = slug
      if (DirectorsOnlySlugs.includes(thisSlug)) {
        return [thisSlug, isDirector(user)]
      }
      if (Object.values(PillarOnlySlugs).some((s) => s.includes(thisSlug))) {
        return [
          thisSlug,
          Object.entries(PillarOnlySlugs).some(([k, s]) => {
            if (s.includes(thisSlug)) {
              return isPillar(user, k)
            }
            return false
          }),
        ]
      }
      if (thisSlug.startsWith('payload')) {
        return [thisSlug, false]
      }

      if (typeof details == 'boolean') {
        return [thisSlug, details as boolean]
      }
      if ('read' in details) {
        return [thisSlug, details.read]
      }
      return [thisSlug, true]
    })
  )
