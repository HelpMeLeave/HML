import { tFn } from '@/_config/i18n/'
import { DescriptionField, TitleField } from '@/collections/_lib/Text'
import { pathHook } from '@/collections/DataCollections/PathwayDocumentTypes/_hooks'
import type { CollectionConfig } from 'payload'

const PathwayDocumentTypes: CollectionConfig<'pathway-document-types'> = {
  slug: 'pathway-document-types',
  timestamps: false,
  admin: {
    group: false,
    custom: {
      parent: 'pathways',
      type: 'utility',
    },
    useAsTitle: 'path',
    defaultColumns: ['title', 'description'],
    groupBy: true,
  },
  defaultPopulate: {
    title: true,
    path: true,
    children: true,
  },
  labels: {
    singular: tFn('title:pathwayDocumentType'),
    plural: tFn('title:pathwayDocumentTypes'),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            TitleField({
              label: 'Document',
              required: true,
            }),
            DescriptionField(),

            {
              type: 'text',
              name: 'path',
              unique: true,
              required: true,
              admin: {
                readOnly: true,
              },
              hooks: {
                beforeValidate: [pathHook],
              },
            },
          ],
        },
        {
          label: 'Structure',
          fields: [
            {
              name: 'parent',
              type: 'relationship',
              relationTo: 'pathway-document-types',
              label: 'Parent Document Type',
            },
            {
              name: 'children',
              type: 'join',
              collection: 'pathway-document-types',
              on: 'parent',
            },
            {
              name: 'documents',
              type: 'join',
              collection: 'pathway-documents',
              on: 'documentType',
              defaultLimit: 0,
            },
          ],
        },
      ],
    },
  ],
}

export default PathwayDocumentTypes
