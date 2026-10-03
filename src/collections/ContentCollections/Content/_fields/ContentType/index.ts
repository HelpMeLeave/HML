import type { tContentType } from '@/collections/ContentCollections/Content/_lib/types'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import type { Field } from 'payload'

const ContentTypeCellPath = '@/collections/ContentCollections/Content/_fields/ContentType/Cell'
const ContentTypeFieldPath = '@/collections/ContentCollections/Content/_fields/ContentType/Field'

export const ContentTypeFields: Field[] = [
  {
    type: 'text',
    name: 'contentType',
    required: true,
    label: 'type',
    hasMany: false,
    admin: {
      hidden: true,
      components: {
        Cell: ContentTypeCellPath,
      },
    },
    validate: (args) => {
      const chk = Boolean(
        args
        && (
          [
            'blog',
            'hub',
            'newsCommentary',
            'other',
            'report',
            'resource',
            'statement',
          ] as tContentType[]
        ).includes(args as tContentType)
      )
      return chk ? chk : 'No Content Type'
    },
    defaultValue: ({ req }) => req.searchParams.get('type'),
  },
  {
    type: 'ui',
    name: 'chooseContentType',
    admin: {
      ...listDisabled,
      components: {
        Field: ContentTypeFieldPath,
      },
    },
  },
]
