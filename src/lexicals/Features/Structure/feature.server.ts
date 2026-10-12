import { createServerFeature } from '@payloadcms/richtext-lexical'

/** Keyboard behaviour shared by Section and SubSection. Registered once; both features' nodes extend the same bases. */
export const StructureFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/Structure/feature.client',
  },
  key: 'structure',
})
