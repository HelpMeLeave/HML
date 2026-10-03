import { tFn } from '@/_config/i18n/'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { LinkConfig } from '@/collections/_lib/Link'
import { DescriptionField, TitleField } from '@/collections/_lib/Text'
import type { CollectionConfig } from 'payload'

const PathwayDocumentsCollectionConfig: CollectionConfig<'pathway-documents'> = {
  slug: 'pathway-documents',
  admin: {
    group: false,
    useAsTitle: 'title',
    components: {
      beforeList: ['@/collections/DataCollections/Pathways/components/BeforeList'],
    },
  },
  timestamps: false,
  labels: {
    singular: tFn('title:pathwayDocument'),
    plural: tFn('title:pathwayDocuments'),
  },
  fields: [
    columnField(
      {},
      {
        type: 'relationship',
        relationTo: 'pathways',
        name: 'pathway',
        required: true,
      },
      {
        type: 'relationship',
        relationTo: 'pathway-document-types',
        name: 'documentType',
        required: true,
      },
      rowField(
        {
          admin: {
            condition: (data) => data?.documentType,
          },
        },
        {
          type: 'checkbox',
          name: 'useDefaultTitle',
          virtual: true,
          defaultValue: true,
        }
      ),
      rowField(
        {
          admin: {
            condition: (data) => data?.documentType,
          },
        },
        {
          type: 'checkbox',
          name: 'useDescription',
          virtual: true,
          defaultValue: true,
        }
      ),
      TitleField({ required: true }),
      DescriptionField(),
      LinkConfig('url', {
        virtual: true,
      })
    ),
  ],
}

export default PathwayDocumentsCollectionConfig
