import { is } from '@/access/is'
import { columnField } from '@/collections/_fields/Flex'
import type { GlobalConfig } from 'payload'

const VolunteerAgreementGlobalConfig: GlobalConfig = {
  slug: 'volunteer-agreement',
  access: {
    read: () => true,
    update: is().Pillar.Operations,
  },
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
        },
      ],
    },
  ],
}

export default VolunteerAgreementGlobalConfig
