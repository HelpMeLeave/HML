import { SubSectionContainerNode } from '@/lexicals/Features/SubSectionFeature/SubSectionContainerNode'
import { SubSectionContentNode } from '@/lexicals/Features/SubSectionFeature/SubSectionContentNode'
import { SubSectionHeadingNode } from '@/lexicals/Features/SubSectionFeature/SubSectionHeadingNode'
import { createServerFeature } from '@payloadcms/richtext-lexical'

export const SubSectionFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/SubSectionFeature/feature.client',
    nodes: [
      { node: SubSectionContainerNode },
      { node: SubSectionHeadingNode },
      { node: SubSectionContentNode },
    ],
  },
  key: 'subsection',
})
