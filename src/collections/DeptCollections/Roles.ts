import { tFn } from '@/_config/i18n/'
import { rowField } from '@/collections/_fields/Flex'
import { PillarRelationField, TeamRelationField } from '@/collections/_fields/relationTo'
import { LinkCellPath } from '@/collections/_lib/Link'
import { DescriptionField, TextConfig } from '@/collections/_lib/Text'
import { ROLE_TIERS } from '@/lib/constants/ROLE_TIERS'
import { type CollectionConfig } from 'payload'

const tierOptions = ROLE_TIERS.map(({ name, value }) => ({
  label: name,
  value: String(value),
}))

const RolesCollectionConfig: CollectionConfig<'roles'> = {
  slug: 'roles',
  defaultSort: ['tier', 'title'],
  defaultPopulate: {
    tier: true,
  },
  lockDocuments: false,
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'team', 'tier'],
    groupBy: true,
    custom: {
      parent: 'admin',
      type: 'item',
    },
    components: {
      edit: {
        beforeDocumentControls: ['@/collections/_components/BtnSaveAdd'],
      },
    },
  },
  labels: {
    singular: tFn('title:role'),
    plural: tFn('title:roles'),
  },
  enableQueryPresets: true,
  timestamps: false,
  fields: [
    rowField(
      {},
      {
        name: 'role',
        type: 'text',
        label: tFn('title:role'),
        required: true,
        admin: {
          components: {
            Cell: {
              serverProps: {
                linkToCollection: 'roles',
                rowDataKey: 'id',
              },
              path: LinkCellPath,
            },
          },
        },
      },
      {
        name: 'tier',
        type: 'select',
        required: true,
        defaultValue: '3',
        options: tierOptions,
      }
    ),
    DescriptionField(),
    PillarRelationField({
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    }),
    TeamRelationField({
      admin: {
        position: 'sidebar',
      },
    }),
    TextConfig('teamName', {
      virtual: 'team.name',
      label: tFn('title:team'),
      admin: {
        hidden: true,
        components: {
          Cell: {
            serverProps: {
              linkToCollection: 'teams',
              rowDataKey: 'team',
            },
            path: LinkCellPath,
          },
        },
      },
    }),
  ],
}

export default RolesCollectionConfig
