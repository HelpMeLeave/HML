import { editorParagraphRichText } from '@/_components/lexicals/nested'
import { tFn } from '@/_config/i18n/'
import { rowField } from '@/collections/_fields/Flex'
import { LinkConfig } from '@/collections/_lib/Link'
import { TextConfig } from '@/collections/_lib/Text'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

export const GlossaryTermCountryCollectionConfig: CollectionConfig<'glossary-term-country'> = {
  slug: 'glossary-term-country',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['term', 'country'],
    group: false,
  },
  labels: {
    singular: tFn('title:countryGlossaryTerms'),
    plural: tFn('title:countryGlossaryTerms'),
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return
        const { termName, countryName } = data
        if (!termName || !countryName) return
        const newValue = `${termName}: ${countryName}`
        data.title = newValue
      },
    ] as CollectionBeforeChangeHook[],
  },
  timestamps: false,
  fields: [
    rowField(
      {},
      {
        type: 'relationship',
        relationTo: 'glossary-term',
        name: 'term',
      },
      {
        type: 'relationship',
        relationTo: 'countries',
        name: 'country',
      }
    ),
    TextConfig('title', {
      admin: {
        hidden: true,
      },
    }),

    {
      type: 'richText',
      editor: editorParagraphRichText,
      name: 'definition',
    },
    {
      type: 'array',
      custom: {
        layout: {
          labelSize: 'base',
        },
      },
      name: 'citatations',
      fields: [rowField({}, TextConfig('title'), LinkConfig('link'))],
    },
    TextConfig('countryName', {
      virtual: 'country.name',
      admin: { ...listDisabled, hidden: true },
    }),
    TextConfig('termName', {
      virtual: 'term.term',
      admin: { ...listDisabled, hidden: true },
    }),
  ],
}
