import { baseFields } from '@/_components/blocks/Button'
import { simpleLinkField } from '@/collections/_fields/LinkBase'
import type { Block } from 'payload'

export const ButtonLinkBlockConfig: Block = {
  interfaceName: 'ButtonLinkBlock',
  slug: 'button-link',
  fields: [
    ...baseFields,

    simpleLinkField({
      nameField: {
        name: 'linkAction',
      },
    }),
  ],
}
