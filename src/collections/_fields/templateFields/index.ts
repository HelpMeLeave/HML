import type { Field } from 'payload'

type TemplateFieldOptions = {
  templateType: string
  /** Path to a custom Field component that replaces the default checkbox UI */
  switchComponent?: string
}

export const templateFields = ({
  templateType,
  switchComponent,
}: TemplateFieldOptions): Field[] => [
  {
    name: 'useTemplate',
    type: 'checkbox',
    label: 'Use Template',
    defaultValue: false,
    ...(switchComponent && {
      admin: {
        components: { Field: switchComponent },
      },
    }),
  },
  {
    name: 'template',
    type: 'relationship',
    relationTo: 'templates',
    label: false,
    admin: {
      allowCreate: false,
      allowEdit: false,
      appearance: 'drawer',
      className: 'my-6!',
      condition: (_, siblingData) => siblingData?.useTemplate === true,
    },
    filterOptions: () => ({
      type: { equals: templateType },
    }),
  },
]
