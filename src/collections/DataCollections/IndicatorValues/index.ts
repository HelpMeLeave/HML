import { is } from '@/access/is'
import type { CollectionConfig } from 'payload'

// Draft of the rebuilt data model: one row per country, per indicator, per year. Nothing reads it yet.
// No stored copies of indicator settings — those are read from the indicator, so they can't drift.
const IndicatorValues: CollectionConfig = {
  slug: 'indicator-values',
  labels: { singular: 'Indicator Value', plural: 'Indicator Values' },
  timestamps: true,
  admin: {
    defaultColumns: ['country', 'indicator', 'year', 'value'],
    listSearchableFields: ['country', 'indicator'],
  },
  access: { update: is({ team: 'Research' }).Team },
  indexes: [{ fields: ['country', 'indicator', 'year'], unique: true }],
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'relationship',
          name: 'country',
          relationTo: 'countries',
          required: true,
          admin: { width: '50%' },
        },
        {
          type: 'relationship',
          name: 'indicator',
          relationTo: 'indicators',
          required: true,
          // Reads go indicator-first too (all countries for one measure), which the compound index doesn't cover
          index: true,
          admin: { width: '50%' },
        },
        {
          type: 'text',
          virtual: 'indicator.kind',
          name: 'indicatorKind',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'number',
          name: 'year',
          required: true,
          defaultValue: () => new Date().getFullYear(),
          min: 1900,
          admin: { width: '50%', step: 1, description: 'The year the data describes.' },
        },

        {
          type: 'number',
          name: 'value',
          required: true,
          admin: {
            width: '50%',
            description: 'For Yes/No indicators, 1 is Yes and 0 is No. For ranks, 1 is best.',
          },
        },
      ],
    },
  ],
}

export default IndicatorValues
