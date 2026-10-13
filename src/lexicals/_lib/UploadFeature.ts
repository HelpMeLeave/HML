// import { normalizeSelectOptions } from '@/lib/normalize'
import { UploadFeature as LexicalUploadFeature } from '@payloadcms/richtext-lexical'
import { duotoneFields } from '../Features/Duotone/_lib/field'

export const UploadFeature = LexicalUploadFeature({
  collections: {
    documents: {
      fields: [{ type: 'text', name: 'adminTitle', label: 'Title' }],
    },
    media: {
      fields: [{ type: 'select', options: ['thumbnail', 'normal'], name: 'size' }],
    },
    'media-content': {
      fields: [
        // {
        //   type: 'select',
        //   options: normalizeSelectOptions('heading', 'aside'),
        //   name: 'purpose',
        //   defaultValue: 'heading',
        // },
        { type: 'select', options: ['thumbnail', 'normal'], name: 'size', defaultValue: 'normal' },
        duotoneFields,
      ],
    },
  },
})
