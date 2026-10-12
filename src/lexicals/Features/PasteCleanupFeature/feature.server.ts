import { createServerFeature } from '@payloadcms/richtext-lexical'

export const PasteCleanupFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/PasteCleanupFeature/feature.client#PasteCleanupClient',
  },
  key: 'paste-cleanup',
})
