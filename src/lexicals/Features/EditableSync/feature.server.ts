import { createServerFeature } from '@payloadcms/richtext-lexical'

export const EditableSyncFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/EditableSync/feature.client',
  },
  key: 'editable-sync',
})
