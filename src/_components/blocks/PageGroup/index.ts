import { createRowLabel } from '@/collections/_labels/RowLabel/rowLabelEl'
import { RadioConfig } from '@/collections/_lib/Radio'
import { TitleField } from '@/collections/_lib/Text'
import { conditionFnBlock } from '@/lib/condition'
import type { PageGroupBlock } from '@/payload-types'
import type { Block } from 'payload'

export const PageGroupBlockConfig: Block = {
  slug: 'page-group',
  interfaceName: 'PageGroupBlock',
  admin: {
    components: {
      Label: '@/_components/blocks/PageGroup/GroupTitleRow',
    },
    images: {
      icon: {
        url: '/lexicalIcons/pageGroup.svg',
        alt: 'Page Group Block',
      },
    },
  },
  fields: [
    TitleField({
      required: true,
      admin: {
        className: 'mb-4',
      },
    }),
    {
      type: 'array',
      required: true,
      name: 'filters',
      admin: {
        className: 'my-4! array-fields:gap-4!',
        components: {
          RowLabel: createRowLabel({
            calculateKey: 'filterTitleRow',
            style: {
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              fontStyle: 'italic',
            },
            className:
              'block w-full font-mono text-xs font-[450] whitespace-pre-wrap uppercase italic',
          }),
        },
      },
      fields: [
        RadioConfig(
          'selectionType',
          [
            { value: 'manual', label: 'Manually Select Items' },
            { value: 'filter', label: 'Query for Items' },
          ],
          {
            virtual: true,
            direction: 'horizontal',
            admin: {
              readOnly: false,
            },
          }
        ),
        {
          type: 'select',
          name: 'type',
          required: true,
          admin: {
            className: 'last-of-type:mb-2!',
            condition: conditionFnBlock({
              key: 'selectionType',
              equals: 'filter',
            }).siblingDataEq,
          },
          options: [
            { label: 'Select Individual Items', value: 'manual' },
            { label: 'Include Content (filter)', value: 'include' },
            { label: 'Exclude Content (filter)', value: 'exclude' },
          ],
        },
        {
          type: 'relationship',
          relationTo: ['externalResources', 'routes'],
          name: 'manual',
          hasMany: true,
          required: true,
          admin: {
            appearance: 'drawer',
            className: 'last-of-type:mb-2!',
            condition: conditionFnBlock({ key: 'type', equals: 'manual' }).siblingDataEq,
          },
        },
        {
          type: 'relationship',
          relationTo: 'tag',
          admin: {
            className: 'last-of-type:mb-2!',
            condition: conditionFnBlock({ key: 'type', in: ['include', 'exclude'] })
              .siblingDataIncludes,
          },
          name: 'filterType',
          filterOptions: {
            or: [
              {
                parent: {
                  exists: false,
                },
              },
              {
                id: {
                  equals: 9,
                },
              },
            ],
          },
        },
        {
          type: 'relationship',
          relationTo: 'tag',
          name: 'filterTypeValues',
          admin: {
            condition: conditionFnBlock({ key: 'type', equals: 'manual' }).siblingDataNotEq,
          },
          hasMany: true,
          filterOptions: ({ siblingData }) => {
            const data = siblingData as Valid<PageGroupBlock['filters']>[number]

            if (!data || !data.filterType) return false

            const filterType = data.filterType as number

            return {
              parent: {
                equals: filterType,
              },
              id: {
                not_equals: 9,
              },
            }
          },
        },
      ],
    },
  ],
}
