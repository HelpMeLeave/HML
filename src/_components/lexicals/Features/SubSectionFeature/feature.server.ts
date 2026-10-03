import { SubSectionContainerNode } from '@/_components/lexicals/Features/SubSectionFeature/SubSectionContainerNode'
import { SubSectionContentNode } from '@/_components/lexicals/Features/SubSectionFeature/SubSectionContentNode'
import { SubSectionHeadingNode } from '@/_components/lexicals/Features/SubSectionFeature/SubSectionHeadingNode'
import { createServerFeature } from '@payloadcms/richtext-lexical'

export const SubSectionFeature = createServerFeature({
  feature: {
    ClientFeature: '@/_components/lexicals/Features/SubSectionFeature/feature.client',
    nodes: [
      { node: SubSectionContainerNode },
      { node: SubSectionHeadingNode },
      { node: SubSectionContentNode },
    ],
  },
  key: 'subsection',
})
