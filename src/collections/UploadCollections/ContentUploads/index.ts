import { cacheHeaders } from '@/collections/UploadCollections/_lib/cacheHeaders'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { LinkConfig } from '@/collections/_lib/Link'
import { TextConfig } from '@/collections/_lib/Text'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import { randomUUID } from 'node:crypto'
import { extname } from 'node:path'
import type { CollectionConfig } from 'payload'
import { generateImageName } from './_lib/generateImageName'

export const MediaContentCollectionConfig: CollectionConfig<'media-content'> = {
  slug: 'media-content',
  admin: {
    groupBy: true,
    useAsTitle: 'name',
    hideAPIURL: true,
    components: {
      edit: {
        Upload: '@/collections/UploadCollections/ContentUploads/_components/Upload',
      },
    },
  },
  access: { read: () => true },
  trash: true,
  timestamps: true,
  lockDocuments: false,
  fields: [
    columnField(
      {
        admin: {
          position: 'sidebar',
          condition: (_data, _siblingData, { operation }) => operation != 'create',
        },
      },
      {
        type: 'date',
        name: 'createdAt',
        hidden: false,
        admin: {
          hidden: false,
          readOnly: true,
          disableListColumn: true,
        },
      },
      {
        type: 'date',
        name: 'updatedAt',
        hidden: false,
        admin: {
          hidden: false,
          disableListColumn: true,
        },
      }
    ),
    rowField(
      {},
      {
        type: 'text',
        name: 'name',
        required: true,
      },
      {
        type: 'text',
        name: 'filename',
        label: 'Filename',
        admin: {
          readOnly: true,
          disableListColumn: true,
          condition: (_data, _siblingData, { operation }) => operation != 'create',
        },
      }
    ),
    LinkConfig('url', {
      label: 'URL',
      admin: {
        disableListColumn: true,
        hidden: false,
        components: {
          Field: '@/collections/_lib/Link/Field',
        },
        readOnly: false,
        condition: (data) => data && data.filename,
      },
    }),
    rowField(
      { admin: { condition: (data) => data && data.filename } },
      TextConfig('thumbnailURL', {
        label: 'Thumbnail URL',
        admin: {
          hidden: false,
          readOnly: false,
          disableListColumn: true,
        },
      })
    ),
    {
      name: 'sizes',
      type: 'group',
      fields: ['thumbnail', 'small', 'small-portrait', 'medium'].map((f) => ({
        type: 'group',
        name: f,
        hidden: false,
        fields: [
          { type: 'text', name: 'url' },
          { type: 'text', name: 'filename' },
          { type: 'number', name: 'filesize' },
          { type: 'text', name: 'height' },
          { type: 'text', name: 'width' },
          { type: 'text', name: 'mimeType' },
        ],
        admin: {
          hidden: false,
        },
      })),
      admin: { disableListColumn: true },
    },
  ],
  hooks: {
    beforeOperation: [
      ({ operation, req }) => {
        if (!req || !req.file) return

        if (operation == 'create') {
          const ext = extname(req.file.name) || `.${req.file.mimetype.split('/')[1]}`
          req.file.name = `${randomUUID()}${ext}`
        }
      },
    ],
  },
  upload: {
    modifyResponseHeaders: cacheHeaders,
    admin: {
      components: {
        controls: ['@/collections/UploadCollections/ContentUploads/_components/Upload'],
      },
    },
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
        admin: { ...listDisabled },
        generateImageName,
      },
      {
        name: 'small',
        width: 660,
        height: 430,
        fit: 'cover',
        crop: 'center',
        admin: { ...listDisabled },
        generateImageName,
      },
      {
        name: 'small-portrait',
        width: 430,
        height: 660,
        fit: 'cover',
        crop: 'center',
        admin: { ...listDisabled },
        generateImageName,
      },
      {
        name: 'medium',
        fit: 'cover',
        width: 800,
        height: 600,
        crop: 'center',
        admin: { ...listDisabled },
        generateImageName,
      },
    ],
    withMetadata: true,
    bulkUpload: true,
    mimeTypes: ['image/*'],
    allowRestrictedFileTypes: false,
  },
}
