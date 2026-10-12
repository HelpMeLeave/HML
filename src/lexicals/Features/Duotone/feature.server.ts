import { createServerFeature } from '@payloadcms/richtext-lexical'

export const DuotoneFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/Duotone/feature.client',
  },
  key: 'duotone',
})
