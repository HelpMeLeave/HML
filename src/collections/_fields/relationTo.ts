import { tFn } from '@/_config/i18n/'
import { isDirector } from '@/access/_primitives'
import { filterOption } from '@/collections/_fields/_filterOptions'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import type { UserRole } from '@/payload-types'
import type { FilterOptionsProps, RelationshipField, Where } from 'payload'

type RelationProps = Partial<RelationshipField>

export const PillarRelationField = (props?: RelationProps): RelationshipField =>
  ({
    type: 'relationship',
    relationTo: 'pillar',
    name: 'pillar',
    label: tFn('title:pillar'),
    ...props,
  }) as RelationshipField

/**
 *
 * @default
 * name: 'teams',
 * hasMany: true,
 * filterOptions: { equals: data.pillar }
 * admin: {...listDisabled}
 */
export const TeamRelationField = (props?: RelationProps) =>
  ({
    type: 'relationship',
    relationTo: 'teams',
    label: tFn('title:teams'),
    name: 'team',
    hasMany: true,
    filterOptions: filterOption.equalsPillar,
    ...props,
    admin: {
      ...listDisabled,
      ...props?.admin,
    },
  }) as RelationshipField

export const RoleRelationField = (props?: RelationProps) =>
  ({
    type: 'relationship',
    relationTo: 'roles',
    name: 'role',
    label: tFn('title:roles'),
    filterOptions: ({
      data: { team, pillar },
      user,
    }: FilterOptionsProps<UserRole>): Where | boolean => {
      if (!user) return true
      if ([!pillar, !isDirector(user) && !team].some(Boolean)) return false

      if (!team && isDirector(user)) {
        return {
          tier: { equals: 0 },
          pillar: { in: pillar },
        }
      }

      if (team && pillar) {
        return {
          and: [
            { team: { equals: team } },
            { pillar: { equals: pillar } },
            { tier: { greater_than_equal: 1 } },
          ],
        }
      }

      return {
        and: [{ team: { in: team } }, { tier: { greater_than_equal: 1 } }],
      }
    },
    ...props,
    admin: {
      condition: (data) => data && data.pillar,
      ...props?.admin,
    },
  }) as RelationshipField
