import { TitledListNode } from '@/lexicals/Features/ListTitleFeature'
import { createServerFeature } from '@payloadcms/richtext-lexical'

export const ListTitleFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/ListTitleFeature/feature.client',
    nodes: [{ node: TitledListNode }],
  },
  key: 'list-title',
})
