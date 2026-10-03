import type { Block } from 'payload'

export const SignatureBlockConfig: Block = {
  slug: 'signature-pad',
  interfaceName: 'SignatureBlock',
  admin: {
    disableBlockName: true,
  },
  labels: {
    singular: 'Signature',
    plural: 'Signatures',
  },
  fields: [
    {
      name: 'data',
      type: 'json',
      admin: {
        hidden: true,
      },
      defaultValue: {
        entry: null,
        url: null,
        type: null,
      },
    },
  ],
}
