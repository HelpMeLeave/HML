import { UploadFeature as LexicalUploadFeature } from '@payloadcms/richtext-lexical'
import { duotoneFields } from '../Features/Duotone/_lib/field'

export const UploadFeature = LexicalUploadFeature({
  collections: {
    documents: {
      fields: [{ type: 'text', name: 'adminTitle', label: 'Title' }],
    },
    media: {
      fields: [
        {
          type: 'select',
          options: ['thumbnail', 'medium', 'normal'],
          defaultValue: 'medium',
          name: 'size',
        },
      ],
    },
    'media-content': {
      fields: [
        {
          type: 'select',
          options: ['thumbnail', 'medium', 'normal'],
          name: 'size',
          defaultValue: 'medium',
        },
        duotoneFields,
      ],
    },
  },
})
