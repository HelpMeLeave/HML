import { tFn } from '@/_config/i18n/'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { TagFields } from '@/collections/_fields/Tabs/Tags'
import { TitleField } from '@/collections/_lib/Text'
import { getAuthorStrings } from '@/collections/UploadCollections/_lib/getAuthorStrings'
import { tagField } from '@/collections/UploadCollections/Documents/TagField'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import { MetaDescriptionField, MetaTitleField } from '@payloadcms/plugin-seo/fields'
import type { CollectionConfig, RelationshipField, ValueWithRelation } from 'payload'

const contributors = [
  { key: 'users', label: 'Author' },
  { key: 'teams', label: 'Team' },
  { key: 'pillar', label: 'Pillar' },
]

const DocumentsCollectionConfig: CollectionConfig<'documents'> = {
  slug: 'documents',
  timestamps: true,
  admin: {
    useAsTitle: 'title',
  },
  upload: {
    displayPreview: true,
    mimeTypes: ['application/pdf'],
    pasteURL: false,
    disableLocalStorage: true,
  },
  folders: {
    browseByFolder: true,
  },
  defaultPopulate: {
    tags: true,
    authors: true,
    authorString: true,
    title: true,
    meta: true,
    publishedDate: true,
    filename: true,
  },
  labels: {
    singular: tFn('title:document'),
    plural: tFn('title:documents'),
  },
  fields: [
    {
      type: 'date',
      name: 'publishedDate',
      admin: { position: 'sidebar' },
    },
    columnField({ label: 'Tags', admin: { position: 'sidebar' } }, tagField(), ...TagFields),
    TitleField({
      required: true,
      hooks: {
        // The Overview tab is hidden while creating, so nothing in the form sets a title; fall back to the file name, as the old Dropzone did
        beforeValidate: [
          ({ value, data, operation }) =>
            value
            || (operation == 'create' && data?.filename ?
              String(data.filename).replace(/\.pdf$/i, '')
            : value),
        ],
      },
    }),
    {
      type: 'textarea',
      name: 'subtitle',
    },
    {
      type: 'relationship',
      name: 'authors',
      hasMany: true,
      relationTo: ['users', 'pillar', 'teams'],
      admin: { hidden: true },
      hooks: {
        afterRead: [
          ({ data, value }) => {
            if (!data || !value) return
            const { authors } = data

            data['contributor-team'] = authors
              .filter((ea: ValueWithRelation) => ea.relationTo == 'teams')
              .map((ea: ValueWithRelation) => ea.value)
            data['contributor-user'] = authors
              .filter((ea: ValueWithRelation) => ea.relationTo == 'users')
              .map((ea: ValueWithRelation) => ea.value)
            data['contributor-pillar'] = authors
              .filter((ea: ValueWithRelation) => ea.relationTo == 'pillar')
              .map((ea: ValueWithRelation) => ea.value)
          },
        ],
      },
      maxDepth: 1,
    },
    rowField(
      {
        label: 'Contributors',
        labelSize: 'small',
      },
      ...(contributors.map((ea) => ({
        type: 'relationship',
        virtual: true,
        hasMany: true,
        admin: {
          allowCreate: false,
          readOnly: false,
          style: { minWidth: '250px' },
        },
        relationTo: ea.key,
        name: `contributor-${ea.key.endsWith('s') ? ea.key.slice(0, -1) : ea.key}`,
        label: ea.label + '(s)',
      })) as RelationshipField[])
    ),
    {
      type: 'text',
      virtual: true,
      name: 'authorString',
      admin: {
        hidden: true,
        ...listDisabled,
      },
      hooks: {
        afterRead: [getAuthorStrings],
      },
    },
    columnField(
      { name: 'meta', admin: { position: 'sidebar' } },
      MetaTitleField({
        hasGenerateFn: true,
        overrides: {
          admin: {
            hidden: true,
            style: {
              // @ts-expect-error custom variables
              '--font-label': 'var(--font-body)',
            },
          },
        },
      }),
      MetaDescriptionField({
        hasGenerateFn: false,
        overrides: {
          admin: {
            style: {
              // @ts-expect-error custom variables
              '--font-label': 'var(--font-body)',
            },
          },
        },
      })
    ),
  ],
  hooks: {
    beforeChange: [
      (args) => {
        const { data } = args
        if (data) {
          const {
            'contributor-user': dataUser,
            'contributor-team': dataTeam,
            'contributor-pillar': dataPillar,
          } = data

          const users = dataUser.map((ea: ValueWithRelation) => ({
            relationTo: 'users',
            value: ea,
          }))
          const teams = (dataTeam ?? []).map((ea: ValueWithRelation) => ({
            relationTo: 'teams',
            value: ea,
          }))
          const pillars = (dataPillar ?? []).map((ea: ValueWithRelation) => ({
            relationTo: 'pillars',
            value: ea,
          }))
          data.authors = [...users, ...teams, ...pillars]
        }
      },
    ],
  },
}

export default DocumentsCollectionConfig
