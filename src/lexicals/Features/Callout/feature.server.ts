import { createServerFeature } from '@payloadcms/richtext-lexical'
import { CalloutNode } from './CalloutNode'

export const CalloutFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/Callout/feature.client',
    nodes: [{ node: CalloutNode }],
  },
  key: 'callout',
})
