import { customLabelPath } from '@/_components/blocks/Form/_lib/paths'
import { BASE_FIELDS } from '@/lib/constants/FORM_FIELDS'
import type { Block } from 'payload'

export const SubformBlock: Block = {
  slug: 'formFieldSubform',
  interfaceName: 'FormFieldSubform',
  admin: {
    components: {
      Label: {
        path: customLabelPath,
      },
    },
  },
  fields: [
    {
      type: 'blocks',
      name: 'questions',
      blocks: BASE_FIELDS,
    },
  ],
  labels: {
    singular: 'Field',
    plural: 'Form Fields',
  },
}
