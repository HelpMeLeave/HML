import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { DescriptionField } from '@/collections/_lib/Text'
import { normalizeAcct } from '@/collections/AccountingCollections/COA/_lib/normalizeAcct'
import { normalizeSelectOptions } from '@/lib/normalize'
import type { CollectionConfig, OptionObject } from 'payload'

const COACollectionConfig: CollectionConfig<'coa'> = {
  slug: 'coa',
  labels: {
    singular: tFn('title:chartOfAccounts'),
    plural: tFn('title:chartsOfAccounts'),
  },
  access: {
    read: is().Bri,
  },
  admin: {
    useAsTitle: 'name',
    components: {
      views: {
        list: {
          Component: {
            path: '@/collections/AccountingCollections/COA/view',
          },
        },
      },
    },
    pagination: {
      defaultLimit: 25,
    },
  },
  timestamps: false,
  custom: {},
  fields: [
    columnField(
      {},
      {
        type: 'number',
        name: 'id',
        unique: true,
        required: true,
        index: true,
        admin: {
          components: {
            Field: '@/collections/AccountingCollections/COA/_components/COAAccountEntry',
          },
          step: 1,
        },
        min: 0,
        max: 9999999,
      },
      {
        type: 'text',
        name: 'name',
        required: true,
      },
      DescriptionField(),
      rowField(
        {},
        {
          type: 'select',
          name: 'debitCreditAccount',
          label: 'DR/CR',
          required: true,
          defaultValue: 'dr',
          hasMany: false,
          options: [
            { label: 'DR', value: 'dr' },
            { label: 'CR', value: 'cr' },
          ],
        },
        {
          type: 'select',
          name: 'reportType',
          required: true,
          hasMany: false,
          options: [
            { label: 'Balance Sheet', value: 'balance' },
            { label: 'Profit/Loss', value: 'pl' },
          ],
        },
        {
          name: 'accountType',
          type: 'select',
          options: normalizeSelectOptions(
            'fixed assets',
            'current assets',
            'current liabilities',
            'long-term liabilities',
            'restricted net assets',
            'unrestricted net assets',
            'temporarily restricted net assets',
            'revenue',
            'expenses'
          ),
          filterOptions: ({ data, options }) => {
            if (!data || !data.reportType) return []

            const plOptions = (options as OptionObject[]).filter(
              (o) =>
                (o as OptionObject).value == 'revenue' || (o as OptionObject).value == 'expenses'
            )

            const balanceOptions = (options as OptionObject[]).filter(
              (o) =>
                (o as OptionObject).value != 'revenue' && (o as OptionObject).value != 'expenses'
            )

            return data.reportType == 'pl' ? plOptions : balanceOptions
          },
        }
      ),
      {
        type: 'relationship',
        relationTo: 'coa',
        name: 'parent',
        filterOptions: ({ data }) => {
          if (!data || !data.id) return false

          const [grp, sub] = normalizeAcct(data.id).toString().split('-')

          const eq = sub == '000' ? Number(grp[0] + '000000') : Number(grp + '000')

          return {
            id: {
              equals: eq,
            },
          }
        },
      },
      {
        type: 'join',
        collection: 'coa',
        on: 'parent',
        name: 'children',
      }
    ),
  ],
}

export default COACollectionConfig
