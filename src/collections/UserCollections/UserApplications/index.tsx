import { SubmissionDisplayForApplicationPath } from '@/_components/blocks/Form/SubmissionDisplay/paths'
import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { normalizeSelectOptions } from '@/lib/normalize'
import type { CollectionConfig } from 'payload'

const UserApplicationCollectionConfig: CollectionConfig<'user-applications'> = {
  slug: 'user-applications',
  admin: {
    useAsTitle: 'name',
  },
  timestamps: true,
  access: {
    read: is().Role.Manager,
  },
  labels: {
    singular: tFn('title:userApplications'),
    plural: tFn('title:userApplications'),
  },
  fields: [
    {
      type: 'ui',
      name: 'submissionDisplay',
      admin: {
        components: {
          Field: SubmissionDisplayForApplicationPath,
        },
      },
    },
    columnField(
      {},
      rowField(
        {},
        {
          type: 'text',
          name: 'name',
          required: true,
        },
        {
          type: 'select',
          name: 'status',
          options: normalizeSelectOptions('submitted', 'reviewing', 'invited'),
          defaultValue: 'submitted',
          admin: {
            width: '200px',
            style: {
              flexGrow: '0 !important',
            },
          },
        }
      ),
      {
        type: 'array',
        name: 'comments',
        fields: [
          {
            type: 'relationship',
            relationTo: 'users',
            name: 'by',
          },
          {
            name: 'comment',
            type: 'richText',
          },
          {
            name: 'commentedAt',
            type: 'date',
          },
        ],
      },
      {
        type: 'relationship',
        relationTo: 'form-submissions',
        name: 'submission',
        required: true,
      }
    ),
  ],
}

export default UserApplicationCollectionConfig
