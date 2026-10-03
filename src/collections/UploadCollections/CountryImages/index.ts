import { tFn } from '@/_config/i18n/'
import { TabCredit } from '@/collections/UploadCollections/Media/TabCredits'
import { TabDetailsFields } from '@/collections/UploadCollections/Media/TabDetails'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import { normalizeSelectOptions } from '@/lib/normalize'
import type { CollectionConfig } from 'payload'

const CountryImages: CollectionConfig<'country-images'> = {
  slug: 'country-images',
  timestamps: true,
  admin: {
    group: false,
    enableRichTextLink: false,
    defaultColumns: ['filename', 'imgOf', 'url'],
    groupBy: true,
    useAsTitle: 'filename',
    description: 'Upload and manage country images',
    components: {
      edit: {
        Upload: {
          path: '@/collections/UploadCollections/CountryImages/UploadField',
        },
      },
    },
  },
  labels: {
    singular: tFn('title:countryImages'),
    plural: tFn('title:countryImages'),
  },
  fields: [
    {
      type: 'row',
      fields: [
        TabDetailsFields.fileName,
        {
          type: 'relationship',
          relationTo: 'countries',
          name: 'imgOf',
          label: 'Country',
          hasMany: false,
        },
      ],
    },
    {
      type: 'row',
      fields: [TabDetailsFields.alt, TabDetailsFields.caption],
    },
    {
      type: 'text',
      virtual: 'imgOf.id',
      name: 'countryId',
      admin: {
        hidden: true,
      },
    },
    {
      type: 'select',
      name: 'direction',
      options: normalizeSelectOptions('landscape', 'portrait'),
    },
    {
      type: 'group',
      name: 'credits',
      custom: {
        layout: {
          direction: 'row',
        },
      },
      fields: TabCredit({
        photographerField: true,
        authorField: false,
      }).fields,
    },
  ],
  upload: {
    constructorOptions: {
      density: 100,
    },
    resizeOptions: {
      fit: 'cover',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
    adminThumbnail: ({ doc }) =>
      `/api/country-images/file/${(doc.filename as string).replace('.jpg', '')}-${doc.direction == 'portrait' ? '280x320' : '320x280'}.jpg`,
    imageSizes: [
      {
        name: 'thumb',
        width: 213,
        formatOptions: {
          format: 'jpeg',
          options: {
            compression: 'webp',
          },
        },
        admin: {
          ...listDisabled,
        },
      },
      {
        name: 'thumbnail',
        width: 320,
        height: 280,
        admin: {
          ...listDisabled,
        },
      },
      {
        name: 'thumbnail-portrait',
        width: 280,
        height: 320,
        admin: {
          ...listDisabled,
        },
      },
      {
        name: 'small',
        width: 640,
        height: 420,
        admin: {
          ...listDisabled,
        },
      },
      {
        name: 'small-portrait',
        width: 420,
        height: 640,
        admin: {
          ...listDisabled,
        },
      },
    ],
    displayPreview: true,
    withMetadata: true,
    bulkUpload: true,
    mimeTypes: ['image/*'],
    disableLocalStorage: true,
  },
  hooks: {
    beforeOperation: [
      ({ req, operation, args }) => {
        if ((operation == 'create' || operation == 'update') && req.file) {
          if (args.data.countryId) {
            const ext = req.file.name.replace(/^.+\.(\w+)$/, '$1')
            req.file.name = `${args.data.countryId}.${ext}`
          } else {
          }
        }
      },
    ],
  },
}

export default CountryImages
