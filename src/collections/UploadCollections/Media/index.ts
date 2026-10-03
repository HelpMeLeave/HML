import { tFn } from '@/_config/i18n/'
import { TabCredit } from '@/collections/UploadCollections/Media/TabCredits'
import { toTitleCase } from '@/lib/textCasing'
import type { Media as tMedia } from '@/payload-types'
import type { CollectionConfig, FieldHookArgs } from 'payload'

const Media: CollectionConfig<'media'> = {
  slug: 'media',
  admin: {
    groupBy: true,
    useAsTitle: 'fileNamePretty',
    hideAPIURL: true,
    description: 'Upload and manage media files such as images and PDFs here.',
    formatDocURL: ({ doc, defaultURL }) => {
      // Disable linking for documents with specific status
      if (doc.status === 'private') {
        return null
      }
      // Use default URL for all other cases
      return defaultURL.replace('api/media/file', 'media')
    },
  },
  trash: true,
  timestamps: true,
  defaultPopulate: {
    filename: true,
    url: true,
    width: true,
    height: true,
    sizes: true,
    meta: true,
    mimeType: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'fileNamePretty',
              type: 'text',
              hooks: {
                afterRead: [
                  ({ ...args }: FieldHookArgs<tMedia>) => {
                    if (!args.data) return
                    if (args.data.filename) {
                      return toTitleCase(args.data.filename.replaceAll('-', ' ').split('.')[0])
                    }
                  },
                ],
              },
            },
          ],
        },
        TabCredit(),
      ],
    },
  ],
  labels: {
    singular: tFn('title:media'),
    plural: tFn('title:medias'),
  },
  upload: {
    resizeOptions: {
      fit: 'cover',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 250,
        height: 250,
        fit: 'cover',
        crop: 'center',
      },
      {
        name: 'small',
        width: 640,
        height: 420,
        fit: 'cover',
        crop: 'center',
      },
      {
        name: 'small-portrait',
        width: 420,
        height: 640,
        fit: 'cover',
        crop: 'center',
      },
      {
        name: 'medium',
        fit: 'cover',
        width: 800,
        height: 600,
        crop: 'center',
      },
    ],
    withMetadata: true,
    bulkUpload: true,
    mimeTypes: ['image/*', 'application/pdf'],
  },
}

export default Media
