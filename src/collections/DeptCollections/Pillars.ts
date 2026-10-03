import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { rowField } from '@/collections/_fields/Flex'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import type { CollectionConfig } from 'payload'

const PillarCollectionConfig: CollectionConfig = {
  slug: 'pillar',
  timestamps: false,
  admin: {
    enableRichTextLink: false,
    useAsTitle: 'name',
  },
  defaultPopulate: {
    name: true,
  },
  labels: {
    singular: tFn('title:pillar'),
    plural: tFn('title:pillars'),
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
              {
                type: 'text',
                name: 'name',
                unique: true,
                access: {
                  create: is().Role.Director,
                  update: is().Role.Director,
                },
              }
            ),
          ],
        },
        {
          label: 'User Management',
          fields: [
            {
              type: 'join',
              collection: 'teams',
              on: 'pillar',
              name: 'teams',
              label: 'Teams',
              admin: {
                ...listDisabled,
              },
            },
            {
              type: 'join',
              collection: 'roles',
              on: 'pillar',
              name: 'roles',
              admin: {
                ...listDisabled,
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              type: 'join',
              collection: 'documents',
              on: 'authors',
              name: 'documents',
              admin: {
                ...listDisabled,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default PillarCollectionConfig
