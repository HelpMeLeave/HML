import {
  $createSectionEyebrowNode,
  $createSectionHGroupNode,
  $createSectionHeadingNode,
  $createSectionSubtitleNode,
} from '@/lexicals/Features/SectionFeature/SectionHGroupNodes'
import {
  $createSectionContainer,
  $createSectionContent,
} from '@/lexicals/Features/SectionFeature/SectionStructureNodes'
import { type LexicalNode, $createParagraphNode } from '@payloadcms/richtext-lexical/lexical'

export const $createFullSection = (children: LexicalNode[]) => {
  const container = $createSectionContainer()
  const hgroup = $createSectionHGroupNode()
  const heading = $createSectionHeadingNode()
  const body = $createSectionContent()

  heading.append(...children)
  hgroup.append($createSectionEyebrowNode(), heading, $createSectionSubtitleNode())
  body.append($createParagraphNode())
  container.append(hgroup, body)

  return { container, hgroup, heading, body }
}
