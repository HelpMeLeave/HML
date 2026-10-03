import { tFn } from '@/_config/i18n/'
import { rowField } from '@/collections/_fields/Flex'
import { PillarRelationField, TeamRelationField } from '@/collections/_fields/relationTo'
import type { GroupField } from 'payload'

export const PillarTeamRow: GroupField = rowField(
  {},
  PillarRelationField({
    label: tFn('title:pillar'),
    required: true,
    virtual: true,
    hasMany: true,
    admin: {
      readOnly: false,
    },
  }),
  TeamRelationField({
    virtual: true,
    admin: {
      readOnly: false,
      condition: (data) => data?.pillar != null && data?.role != 13,
    },
  })
)
