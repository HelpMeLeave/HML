import { editorParagraphRichText } from '@/_components/lexicals/nested'
import { tFn } from '@/_config/i18n/'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { CheckboxConfig, CheckboxGroupConfig } from '@/collections/_lib/Checkbox'
import { RichTextConfig } from '@/collections/_lib/RichText'
import { TextConfig, TitleField } from '@/collections/_lib/Text'
import { normalizeSelectOptions } from '@/lib/normalize'
import type { CollectionConfig } from 'payload'

export const V1Pathways: CollectionConfig<'v1Pathways'> = {
  slug: 'v1Pathways',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'country', 'description', 'status'],
  },
  defaultPopulate: {
    country: true,
  },
  labels: {
    singular: tFn('title:v1Pathways'),
    plural: tFn('title:v1Pathways'),
  },
  timestamps: false,
  fields: [
    rowField(
      {},
      TitleField({
        required: true,
      }),
      {
        type: 'relationship',
        relationTo: 'countries',
        name: 'country',
        required: true,
      },
      TextConfig('countryName', {
        virtual: 'country.name',
        admin: { hidden: true },
      })
    ),
    TextConfig('link'),
    rowField(
      {},
      columnField(
        {},
        CheckboxConfig('unMember', {
          virtual: 'country.unMember',
        }),
        {
          type: 'select',
          name: 'status',
          options: normalizeSelectOptions('wip', 'done'),
          defaultValue: 'wip',
        }
      ),
      RichTextConfig('description', editorParagraphRichText)
    ),
    {
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        CheckboxGroupConfig(
          'Financial Situation',
          [
            {
              name: 'monthlyIncome',
              options: { defaultValue: false },
            },
            {
              name: 'jobRequired',
              options: { defaultValue: false },
            },
          ],
          { size: 'base' }
        ),
        CheckboxGroupConfig(
          'Age Group',
          [
            {
              label: '18-30',
              name: 'age1830',
              options: { defaultValue: false },
            },
            {
              label: '60+',
              name: 'age60plus',
              options: { defaultValue: false },
            },
          ],
          { size: 'base' }
        ),
        CheckboxGroupConfig(
          'Life',
          [
            {
              name: 'travellingWithKids',
              options: { defaultValue: false },
            },
            {
              name: 'education',
              options: { defaultValue: false },
            },
            {
              name: 'digitalWorker',
              options: { defaultValue: false },
            },
            {
              name: 'entrepreneur',
              options: { defaultValue: false },
            },
          ],
          { size: 'base', direction: 'vertical' }
        ),
      ],
    },
  ],
}
