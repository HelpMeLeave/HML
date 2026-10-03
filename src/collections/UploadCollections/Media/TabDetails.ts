import type { Media } from '@/payload-types'
import type { Field, FieldHookArgs, Tab, TextField } from 'payload'

const uploadPrettyFileName: TextField = {
  name: 'fileNamePretty',
  type: 'text',
  label: 'Title',
  hooks: {
    afterRead: [
      ({ ...args }: FieldHookArgs<Media>) => {
        if (!args.data) return
        if (args.data.filename) {
          return args.data.filename.replaceAll('-', ' ').split('.')[0]
        }
      },
    ],
  },
}

const uploadAltField: TextField = {
  name: 'alt',
  type: 'text',
  admin: {
    description: 'Alternative text for the media item, used for accessibility and SEO.',
  },
}

const uploadCaptionField: TextField = {
  name: 'caption',
  type: 'text',
  admin: {
    description: 'A short description or caption for the media item.',
  },
}

export const TabDetailsFields = {
  fileName: uploadPrettyFileName,
  alt: uploadAltField,
  caption: uploadCaptionField,
}

export const TabDetails = (...otherFields: Field[]): Tab => ({
  label: 'Details',
  fields: [
    TabDetailsFields.fileName,
    {
      type: 'row',
      custom: {
        layout: {
          direction: 'row',
        },
      },
      fields: [uploadAltField, uploadCaptionField],
    },

    ...otherFields,
  ],
})
