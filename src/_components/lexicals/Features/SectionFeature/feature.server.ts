import {
  SectionEyebrowNode,
  SectionHeadingNode,
  SectionHGroupNode,
  SectionSubtitleNode,
} from '@/_components/lexicals/Features/SectionFeature/SectionHGroupNodes'
import {
  SectionContainerNode,
  SectionContentNode,
} from '@/_components/lexicals/Features/SectionFeature/SectionStructureNodes'
import { createServerFeature } from '@payloadcms/richtext-lexical'

export const SectionFeature = createServerFeature({
  feature: {
    ClientFeature: '@/_components/lexicals/Features/SectionFeature/feature.client',
    nodes: [
      // Gate-opener, not logic: richtext-lexical returns early from its beforeValidate field hook unless some node type registers one (dist/index.js:585).
      // Opening that gate lets `beforeValidateTraverseFields` run over link sub-fields, which is what collapses `{relationTo, value:{id}}` to `{relationTo, value:id}` before validation sees it.
      // The body never executes — only nodes carrying an id reach `nodeIDMap`, and section nodes carry none. Registering it is the entire effect.
      { node: SectionContainerNode, hooks: { beforeValidate: [({ node }) => node] } },
      { node: SectionHGroupNode },
      { node: SectionHeadingNode },
      { node: SectionEyebrowNode },
      { node: SectionSubtitleNode },
      { node: SectionContentNode },
    ],
  },
  key: 'section-hgroup',
})
