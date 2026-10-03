import { is } from '@/access/is'
import { columnField } from '@/collections/_fields/Flex'
import { createPathHook } from '@/collections/_lib/createPathHook'
import { JoinConfig } from '@/collections/_lib/Join'
import { Tab, Tabs } from '@/collections/_lib/Tabs'
import { DescriptionField, TextConfig, TitleField } from '@/collections/_lib/Text'
import type { CollectionConfig } from 'payload'

const pathHooks = {
  beforeValidate: [createPathHook('pathway-categories')],
}

const PathwaysCategories: CollectionConfig = {
  slug: 'pathway-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description'],
    groupBy: true,
    group: false,
    components: {
      beforeList: [
        {
          path: '@/collections/DataCollections/Pathways/components/BeforeList',
          serverProps: { slug: 'pathway-categories' },
        },
      ],
    },
  },
  defaultPopulate: { title: true, path: true, children: true },
  timestamps: false,
  access: { update: is().Role.Manager },
  /* TODO: PATHWAY CATEGORIES */
  fields: [
    columnField(
      { label: { text: 'Overview', type: 'lg' } },
      TitleField({ label: 'Category', required: true }),
      DescriptionField(),
      {
        name: 'parent',
        type: 'relationship',
        relationTo: 'pathway-categories',
        label: 'Parent Category',
      },
      TextConfig('path', { required: true, hooks: pathHooks, readOnly: true })
    ),
    Tabs(
      Tab('Children', [JoinConfig('children', 'pathway-categories', 'parent')]).field(),
      Tab('Pathways', [JoinConfig('pathways', 'pathways', 'cats', { defaultLimit: 0 })]).field()
    ).field(),
  ],
}

export default PathwaysCategories
