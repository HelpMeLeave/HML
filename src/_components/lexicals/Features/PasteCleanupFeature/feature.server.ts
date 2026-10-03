import { createServerFeature } from '@payloadcms/richtext-lexical'

export const PasteCleanupFeature = createServerFeature({
  feature: {
    ClientFeature:
      '@/_components/lexicals/Features/PasteCleanupFeature/feature.client#PasteCleanupClient',
  },
  key: 'paste-cleanup',
})
