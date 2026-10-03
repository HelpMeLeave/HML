import { tFn } from '@/_config/i18n/'
import { rowField } from '@/collections/_fields/Flex'
import { HasManyFieldPath } from '@/collections/_lib/HasMany'
import { LinkConfig } from '@/collections/_lib/Link'
import { RadioConfig } from '@/collections/_lib/Radio'
import { RichTextConfig } from '@/collections/_lib/RichText'
import { TextConfig } from '@/collections/_lib/Text'
import { relatedTerms } from '@/collections/DataCollections/GlossaryTerms/hooks/relatedTerms'
import { glossaryLexical } from '@/collections/DataCollections/GlossaryTerms/lexical'
import { conditionFn } from '@/lib/condition'
import { normalizeSelectOptions } from '@/lib/normalize'
import type { GlossaryTerm } from '@/payload-types'
import type { CollectionConfig } from 'payload'

const GlossaryCollectionConfig: CollectionConfig<'glossary-term'> = {
  slug: 'glossary-term',
  timestamps: false,
  admin: {
    useAsTitle: 'term',
  },
  hooks: {
    beforeChange: [relatedTerms],
  },

  labels: {
    singular: tFn('title:glossaryTerms'),
    plural: tFn('title:glossaryTerms'),
  },
  fields: [
    rowField(
      {},
      TextConfig('term', {
        required: true,
      }),
      TextConfig('abbreviation', {
        textType: 'abbreviation',
        admin: {
          width: '100px',
        },
      })
    ),
    RichTextConfig('definition', glossaryLexical),
    RadioConfig('termType', normalizeSelectOptions('single term', 'group term'), {
      required: true,
      size: 'small',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 'single term',
    }),
    {
      type: 'relationship',
      hasMany: true,
      name: 'childTerms',
      relationTo: 'glossary-term',
      admin: {
        condition: conditionFn<GlossaryTerm, 'termType'>({
          equals: 'group term',
          key: 'termType',
        }).siblingDataEq,
      },
      filterOptions: {
        termType: { equals: 'single term' },
      },
    },
    {
      type: 'join',
      on: 'term',
      collection: 'glossary-term-country',
      name: 'countryTerms',
      label: 'Country Specific Details',
      admin: {
        allowCreate: true,
        defaultColumns: ['country'],
      },
    },
    {
      type: 'text',
      hasMany: true,
      name: 'alias',
      label: 'Alias(es)',
      custom: {
        layout: {
          labelSize: 'small',
        },
      },
      index: true,
      admin: {
        position: 'sidebar',
        placeholder: 'Add an Alias...',
        components: {
          Field: HasManyFieldPath,
        },
      },
    },
    {
      type: 'array',
      admin: {
        position: 'sidebar',
        style: {
          marginTop: 0,
        },
      },
      custom: {
        layout: {
          labelSize: 'small',
        },
      },
      name: 'citatations',
      fields: [rowField({}, TextConfig('title'), LinkConfig('link'))],
    },

    {
      type: 'relationship',
      hasMany: true,
      name: 'relatedTerms',
      relationTo: 'glossary-term',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default GlossaryCollectionConfig
