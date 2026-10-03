import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { columnField } from '@/collections/_fields/Flex'
import { RoleRelationField } from '@/collections/_fields/relationTo'
import { PillarTeamRow } from '@/collections/UserCollections/PillarTeamRow'
import {
  checkManagementTagsOnDelete,
  getTeamFromRole,
} from '@/collections/UserCollections/UserRoles/_hooks'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import type { CollectionConfig } from 'payload'

const UserRolesCollectionConfig: CollectionConfig<'user-roles'> = {
  slug: 'user-roles',
  admin: {
    hideAPIURL: false,
    defaultColumns: ['user', 'role', 'team', 'pillar'],
  },
  access: {
    read: () => true,
    update: is().Role.Manager,
    create: is().Role.Manager,
    delete: is().Role.Director,
  },
  timestamps: true,
  defaultPopulate: {
    pillar: true,
    pillarNameString: true,
    teamNameString: true,
    team: true,
    role: true,
  },
  labels: {
    singular: tFn('title:userRole'),
    plural: tFn('title:userRoles'),
  },
  fields: [
    columnField(
      {},
      {
        type: 'relationship',
        relationTo: 'users',
        name: 'user',
        required: true,
        label: tFn('general:user', true),
      },
      PillarTeamRow,
      RoleRelationField({
        required: true,
        index: true,
      }),
      {
        type: 'text',
        virtual: 'team.name',
        name: 'teamNameString',
        admin: {
          hidden: true,
          ...listDisabled,
        },
      },
      {
        type: 'text',
        virtual: 'pillar.name',
        name: 'pillarNameString',

        saveToJWT: true,
        admin: {
          hidden: true,
          ...listDisabled,
        },
      }
    ),
  ],
  hooks: {
    afterRead: [getTeamFromRole],
    afterDelete: [checkManagementTagsOnDelete],
  },
}

export default UserRolesCollectionConfig
