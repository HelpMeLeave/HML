import { createServerFeature } from '@payloadcms/richtext-lexical'

export const BlockGateFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/BlockGate/feature.client',
  },
  key: 'block-gate',
})
