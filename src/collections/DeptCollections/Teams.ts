import { NameField } from '@/_components/fields/Name'
import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { rowField } from '@/collections/_fields/Flex'
import { PillarRelationField } from '@/collections/_fields/relationTo'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import type { CollectionConfig } from 'payload'

const Teams: CollectionConfig<'teams'> = {
  slug: 'teams',
  lockDocuments: false,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
    groupBy: true,
  },
  timestamps: true,
  enableQueryPresets: true,
  defaultSort: ['name'],
  defaultPopulate: { name: true },
  labels: {
    singular: tFn('title:team'),
    plural: tFn('title:teams'),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            rowField(
              {},
              NameField({
                name: 'name',
                required: true,
                unique: true,
              }),
              PillarRelationField({
                access: {
                  update: is().Role.Director,
                },
                maxDepth: 1,
                admin: {
                  allowCreate: false,
                },
              })
            ),
            rowField(
              {},
              {
                type: 'text',
                virtual: 'pillar.director.name',
                admin: {
                  readOnly: true,
                  ...listDisabled,
                },
                name: 'director',
                validate: () => {
                  return true as const
                },
              }
            ),
            {
              type: 'join',
              collection: 'roles',
              on: 'team',
              name: 'roles',
            },
          ],
        },
      ],
    },
  ],
}

export default Teams
