import { CheckmarkListItemNode } from '@/_components/lexicals/Features/CheckmarkList/CheckmarkListItemNode'
import { CheckmarkListNode } from '@/_components/lexicals/Features/CheckmarkList/CheckmarkListNode'
import { createServerFeature } from '@payloadcms/richtext-lexical'

export const CustomCheckmarkServer = createServerFeature({
  feature: {
    ClientFeature:
      '@/_components/lexicals/Features/CheckmarkList/feature.client#CustomCheckmarkClient',

    nodes: [{ node: CheckmarkListNode }, { node: CheckmarkListItemNode }],
  },
  key: 'checkmark-list',
})
