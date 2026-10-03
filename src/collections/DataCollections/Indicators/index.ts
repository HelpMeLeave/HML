import { is } from '@/access/is'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { JoinConfig } from '@/collections/_lib/Join'
import { DescriptionField, TextConfig } from '@/collections/_lib/Text'
import { importEndpoint } from '@/collections/DataCollections/Indicators/_endpoints/import'
import type { CollectionConfig } from 'payload'
import { slugify } from 'payload/shared'

const IndicatorsCollectionConfig: CollectionConfig<'indicators'> = {
  slug: 'indicators',
  labels: {
    singular: 'Indicator',
    plural: 'Indicators',
  },
  timestamps: false,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'kind', 'higherIsBetter', 'threshold'],
    components: {
      edit: {
        // Import drawer: paste values for one year, preview, save through the import endpoint
        beforeDocumentControls: ['@/collections/DataCollections/Indicators/Import'],
      },
    },
  },
  // Same gate as the current `indicators` collection
  access: {
    update: is({ team: 'Research' }).Team,
  },
  // POST /api/indicators/:id/import
  endpoints: [importEndpoint],
  fields: [
    rowField(
      {},
      rowField(
        {},
        TextConfig('name', { required: true, admin: { width: '500px' } }),
        TextConfig('slug', {
          required: true,
          unique: true,
          readOnly: true,
          description: 'Set from the name on first save.',
          admin: { width: '250px' },
          hooks: {
            beforeValidate: [
              ({ data, value }) => value || (data?.name ? slugify(data.name) : value),
            ],
          },
        })
      ),
      DescriptionField({
        label: 'What this measures',
        admin: {
          rows: 6,
          description: 'Plain-language explanation shown next to the number.',
        },
      })
    ),
    // #region ! ---------- HOW TO READ IT ----------
    rowField(
      {},
      {
        type: 'select',
        name: 'kind',
        required: true,
        defaultValue: 'score',
        options: [
          { label: 'Yes / No', value: 'yes-no' },
          { label: 'Score', value: 'score' },
          { label: 'Rank', value: 'rank' },
        ],
        admin: {
          width: '500px',
          description:
            'Yes/No is stored as 1 or 0. Score is any number on a scale. Rank is a position where 1 is best.',
        },
      },
      {
        type: 'select',
        name: 'format',
        defaultValue: 'decimal',
        options: [
          { label: 'Whole number', value: 'whole' },
          { label: 'Decimal', value: 'decimal' },
          { label: 'Percent', value: 'percent' },
        ],
        admin: {
          width: '50%',
          // Yes/No shows as a badge and ranks are always whole numbers
          condition: (data) => data?.kind == 'score',
          description: 'How the number is written on the site.',
        },
      },
      {
        type: 'checkbox',
        name: 'higherIsBetter',
        label: 'Higher is better',
        defaultValue: true,
        admin: {
          width: '50%',
          // A rank is always lower-is-better, so there's nothing to choose
          condition: (data) => data?.kind != 'rank',
          description:
            'Untick for things like crime or cost of living. For Yes/No, ticked means Yes is the good answer.',
        },
      },
      {
        type: 'number',
        name: 'threshold',
        label: 'Positive threshold',
        admin: {
          width: '50%',
          // Yes/No already has its cut-off: the good answer passes
          condition: (data) => data?.kind != 'yes-no',
          description:
            'The "good enough" point. It is the yellow midpoint of the colour scale and the pass/fail line for badges.',
        },
      }
    ),
    // #endregion ! --------------------

    // #region ! ---------- SOURCE ----------
    columnField(
      { admin: { position: 'sidebar' } },
      {
        type: 'group',
        name: 'source',
        admin: {
          hideGutter: true,
          position: 'sidebar',
          description: 'Where the numbers come from.',
        },
        fields: [
          { type: 'text', name: 'name', label: 'Source name' },
          { type: 'text', name: 'url', label: 'Link' },
          {
            type: 'number',
            name: 'published',
            label: 'Year published',
            admin: { step: 1 },
          },
        ],
      },
      columnField(
        { label: 'Community Badge', labelSize: 'large' },
        {
          type: 'text',
          name: 'icon',
          admin: { components: { Field: '@/collections/DataCollections/Indicators/Icon' } },
        },
        // Where the indicator appears is chosen here, not inferred from its icon, so any icon can be used anywhere
        {
          type: 'checkbox',
          name: 'communityBadge',
          label: 'Community Badge',
          defaultValue: false,
          admin: {
            description:
              'Show as a pass/fail badge on explorer cards and country pages. The badge appears when the country passes.',
          },
        },
        {
          type: 'checkbox',
          name: 'useOnCountryPage',
          label: 'Use on Country Page',
          defaultValue: false,
          admin: {
            description:
              'Show this indicator in the stats on each country page, coloured by its score.',
          },
        }
      )
    ),
    // #endregion ! --------------------
    JoinConfig('values', 'indicator-values', 'indicator', {
      defaultLimit: 25,
      defaultColumns: ['country', 'year', 'value'],
      description: 'Every country value recorded for this indicator.',
    }),
  ],
}

export default IndicatorsCollectionConfig
