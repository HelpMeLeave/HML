import { createServerFeature } from '@payloadcms/richtext-lexical'

export const ActionToolbarFeature = createServerFeature({
  feature: { ClientFeature: '@/lexicals/Features/ActionToolbar/feature.client' },
  key: 'action-toolbar',
})
