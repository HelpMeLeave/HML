import { hasContentType } from '@/collections/ContentCollections/Content/_lib/conditions'
import type { Field } from 'payload'

const ContentTitleFieldPath = '@/collections/ContentCollections/Content/_fields/Title/Field'
const ContentTitleCellPath = '@/collections/ContentCollections/Content/_fields/Title/Cell'

export const ContentTitleField: Field = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    condition: hasContentType,
    components: {
      Field: ContentTitleFieldPath,
      Cell: ContentTitleCellPath,
    },
    className: 'page-title',
  },
}
