import { SignatureBlockConfig } from '@/_components/blocks/Signature'
import { is } from '@/access/is'
import { columnField } from '@/collections/_fields/Flex'
import { contentEditor } from '@/lexicals/editors'
import type { GlobalConfig } from 'payload'

const VolunteerAgreementGlobalConfig: GlobalConfig = {
  slug: 'volunteer-agreement',
  access: {
    read: () => true,
    update: is().Pillar.Operations,
  },
  lockDocuments: false,
  admin: {},
  fields: [
    columnField(
      {
        label: {
          text: 'Current',
          type: 'xl',
        },
      },
      {
        type: 'date',
        name: 'startedOn',
      },
      {
        type: 'richText',
        name: 'agreement',
        editor: contentEditor({ blocks: [SignatureBlockConfig] }),
      }
    ),
    {
      type: 'array',
      name: 'history',
      fields: [
        {
          type: 'date',
          name: 'startedOn',
        },
        {
          type: 'date',
          name: 'endedOn',
        },
        {
          type: 'richText',
          name: 'agreement',
          editor: contentEditor({ blocks: [SignatureBlockConfig] }),
        },
      ],
    },
  ],
}

export default VolunteerAgreementGlobalConfig
