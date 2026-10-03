import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { columnField } from '@/collections/_fields/Flex'
import { LinkConfig } from '@/collections/_lib/Link'
import { DescriptionField, TitleField } from '@/collections/_lib/Text'
import type { CollectionConfig } from 'payload'

const ExternalResourceCollectionConfig: CollectionConfig<'externalResources'> = {
  slug: 'externalResources',
  admin: { defaultColumns: ['title', 'url'], useAsTitle: 'title' },
  access: {
    read: () => true,
    update: is().Pillar.Marketing,
  },
  labels: {
    singular: tFn('title:externalResources'),
    plural: tFn('title:externalResources'),
  },
  timestamps: false,
  fields: [
    columnField(
      { admin: { className: 'px-6' } },
      TitleField({ required: true }),
      LinkConfig('url', { required: true, unique: true }),
      DescriptionField()
    ),
  ],
}

export default ExternalResourceCollectionConfig
