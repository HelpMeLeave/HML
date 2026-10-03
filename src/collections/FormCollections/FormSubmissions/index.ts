import { SubmissionDisplayPath } from '@/_components/blocks/Form/SubmissionDisplay/paths'
import { tFn } from '@/_config/i18n/'
import { columnField } from '@/collections/_fields/Flex'
import { createApplicationFromSubmission } from '@/collections/UserCollections/UserApplications/_hooks/createFromSubmission'
import type { CollectionConfig } from 'payload'
import { sendEmail } from './_email/sendEmail'

const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    enableRichTextRelationship: false,
    defaultColumns: ['form', 'createdAt'],
    group: false,
  },
  timestamps: true,
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
    update: () => false,
  },
  hooks: {
    afterChange: [sendEmail, createApplicationFromSubmission],
  },
  labels: {
    singular: tFn('title:formSubmission'),
    plural: tFn('title:formSubmissions'),
  },
  fields: [
    columnField(
      {},
      {
        type: 'ui',
        name: 'submissionDisplay',
        admin: {
          components: { Field: SubmissionDisplayPath },
        },
      },
      {
        name: 'form',
        type: 'relationship',
        relationTo: 'forms',
        required: true,
      },
      {
        name: 'submissionData',
        type: 'array',
        fields: [
          { name: 'field', type: 'text', required: true },
          {
            name: 'value',
            type: 'textarea',
            required: true,
            validate: (value: unknown) => typeof value !== 'undefined' || 'This field is required.',
          },
        ],
      }
    ),
  ],
}

export default FormSubmissions
