import { CheckmarkListItemNode } from '@/lexicals/Features/CheckmarkList/CheckmarkListItemNode'
import { CheckmarkListNode } from '@/lexicals/Features/CheckmarkList/CheckmarkListNode'
import { createServerFeature } from '@payloadcms/richtext-lexical'

export const CustomCheckmarkServer = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/CheckmarkList/feature.client#CustomCheckmarkClient',

    nodes: [{ node: CheckmarkListNode }, { node: CheckmarkListItemNode }],
  },
  key: 'checkmark-list',
})
