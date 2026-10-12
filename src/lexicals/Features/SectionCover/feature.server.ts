import { createServerFeature } from '@payloadcms/richtext-lexical'

export const SectionCoverFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/SectionCover/feature.client',
  },
  key: 'section-cover',
})
