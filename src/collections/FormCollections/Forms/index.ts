import { tFn } from '@/_config/i18n/'
import { DataTab } from '@/collections/FormCollections/Forms/_TabData'
import { FieldsTab } from '@/collections/FormCollections/Forms/_TabFields'
import type { CollectionConfig } from 'payload'

const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'title',
    enableRichTextRelationship: false,
    defaultColumns: ['title', 'createdAt'],
  },
  timestamps: true,
  access: {
    read: () => true,
  },
  labels: {
    singular: tFn('title:form'),
    plural: tFn('title:forms'),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [DataTab, FieldsTab],
    },
  ],
}

export default Forms
