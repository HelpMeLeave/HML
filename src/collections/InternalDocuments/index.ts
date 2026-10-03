import { is } from '@/access/is'
import { columnField } from '@/collections/_fields/Flex'
import { TitleField } from '@/collections/_lib/Text'
import type { InternalDocument } from '@/payload-types'
import type { CollectionConfig } from 'payload'
import type { Config } from 'payload-workflow'

const InternalDocumentsCollectionConfig: CollectionConfig = {
  slug: 'internal-documents',
  custom: {
    workflow: {
      flow: {
        wip: {
          pillLabel: 'Work in Process',
          published: { btnLabel: 'Publish' },
        },
        published: true,
      },
      // No review step, so no `locksAt` — the base never closes to edits.
      track: Object.fromEntries(
        (['deletedAt'] as (keyof InternalDocument)[]).map((ea) => [ea, false])
      ) as Record<keyof InternalDocument, false>,
    } as Config.Obj<'internal-documents'>,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'workflow'],
  },
  trash: true,
  defaultPopulate: {
    title: true,
  },
  access: {
    read: ({ req, data }) => {
      if (!!!req.user) return false
      if (data?.workflow == 'published') return true
      return is().Pillar.Operations({ req, data })
    },
    update: is().Pillar.Operations,
    delete: is().Role.Director,
    create: is().Pillar.Operations,
  },
  /* TODO: INTERNAL DOCUMENTS TRANSLATIONS */
  timestamps: true,
  fields: [
    columnField(
      {},
      TitleField(),
      {
        type: 'richText',
        name: 'content',
      },
      {
        type: 'relationship',
        relationTo: 'tag',
        name: 'tags',
        hasMany: true,
        admin: {
          appearance: 'drawer',
        },
        filterOptions: {
          or: [{ 'parent.title': { equals: 'internal' } }, { title: { equals: 'internal' } }],
        },
      }
    ),
  ],
}

export default InternalDocumentsCollectionConfig
