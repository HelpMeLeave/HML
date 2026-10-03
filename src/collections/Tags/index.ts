import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { CheckboxConfig } from '@/collections/_lib/Checkbox'
import { JoinConfig } from '@/collections/_lib/Join'
import { TextConfig, TitleField } from '@/collections/_lib/Text'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import { toCamelCase } from '@/lib/textCasing'
import type { CollectionConfig, Data, TextField } from 'payload'

const topLevelCondition = (data: Data) =>
  data.parent == null || !data.parent || (Array.isArray(data.parent) && data.parent.length == 0)
const titleFieldHooks: TextField['hooks'] = {
  beforeChange: [
    ({ siblingData, value }) => {
      if (!siblingData || !siblingData.display) {
        return
      }
      const newValue = toCamelCase(siblingData.display)
      if (!value || value != newValue) return newValue
    },
  ],
}

const TagsCollectionConfig: CollectionConfig<'tag'> = {
  slug: 'tag',
  defaultPopulate: {
    title: true,
    display: true,
    topLevel: true,
    parent: true,
    childIds: true,
    children: true,
    canQuery: true,
  },
  access: { update: is().Role.Manager },
  admin: {
    useAsTitle: 'display',
    components: { edit: { beforeDocumentControls: ['@/collections/_components/BtnSaveAdd'] } },
    defaultColumns: ['title'],
    groupBy: true,
  },
  labels: { singular: tFn('title:tag'), plural: tFn('title:tags') },
  timestamps: true,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            rowField(
              {},
              TitleField({
                required: true,
                unique: true,
                admin: { hidden: true },
                hooks: titleFieldHooks,
              }),
              TextConfig('display', { label: 'Title' })
            ),
            rowField(
              {},
              columnField(
                {},
                CheckboxConfig('topLevel', {
                  defaultValue: false,
                  admin: { width: '20%', disableListColumn: true, condition: topLevelCondition },
                }),
                CheckboxConfig('canQuery', { defaultValue: true })
              ),
              {
                type: 'relationship',
                relationTo: 'tag',
                name: 'parent',
                hasMany: true,
                admin: {
                  width: 'auto',
                  disableListColumn: true,
                  disableGroupBy: true,
                  disableListFilter: true,
                  condition: (data) => !data.topLevel,
                },
              },
              TextConfig('parentTitle', {
                virtual: 'parent.title',
                admin: {
                  hidden: true,
                  disableListColumn: true,
                  condition: (_data, siblingData) => siblingData.parent,
                },
              }),
              {
                name: 'parentString',
                type: 'ui',
                label: 'Parent',
                admin: {
                  components: {
                    Cell: '@/collections/Tags/ParentString#ParentStringCell',
                  },
                },
              }
            ),
            JoinConfig('children', 'tag', 'parent', {
              maxDepth: 1,
              admin: {
                className: 'flex-[0_1_21rem]!',
                style: { flex: '0 1 21rem' },
                width: '21rem',
              },
            }),
            {
              type: 'number',
              hasMany: true,
              virtual: 'children.id',
              name: 'childIds',
              admin: { hidden: true, ...listDisabled },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            rowField(
              { admin: { className: 'tags-joins' } },
              JoinConfig('documents', 'documents', 'tags', {
                defaultColumns: ['title'],
                allowCreate: false,
              }),
              JoinConfig('topic', 'content', 'topic', { allowCreate: false })
            ),
          ],
        },
      ],
    },
  ],
}

export default TagsCollectionConfig
