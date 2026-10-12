import {
  SectionEyebrowNode,
  SectionHeadingNode,
  SectionHGroupNode,
  SectionSubtitleNode,
} from '@/lexicals/Features/SectionFeature/SectionHGroupNodes'
import {
  SectionContainerNode,
  SectionContentNode,
} from '@/lexicals/Features/SectionFeature/SectionStructureNodes'
import { createServerFeature } from '@payloadcms/richtext-lexical'

export const SectionFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/SectionFeature/feature.client',
    nodes: [
      // no-op: lexical skips node sub-field beforeValidate (link value normalization) unless some node registers this hook
      { node: SectionContainerNode, hooks: { beforeValidate: [({ node }) => node] } },
      { node: SectionHGroupNode },
      { node: SectionHeadingNode },
      { node: SectionEyebrowNode },
      { node: SectionSubtitleNode },
      { node: SectionContentNode },
    ],
  },
  key: 'section',
})
