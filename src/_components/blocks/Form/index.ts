import type { Block } from 'payload'

export const FormBlockConfig: Block = {
  slug: 'form',
  interfaceName: 'FormBlock',
  labels: {
    singular: 'Form',
    plural: 'Forms',
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
}
