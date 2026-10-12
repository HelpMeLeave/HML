import { $createSubSectionContainer } from '@/lexicals/Features/SubSectionFeature/SubSectionContainerNode'
import { $createSubSectionContentNode } from '@/lexicals/Features/SubSectionFeature/SubSectionContentNode'
import { $createSubSectionHeadingNode } from '@/lexicals/Features/SubSectionFeature/SubSectionHeadingNode'
import { $createParagraphNode, type LexicalNode } from '@payloadcms/richtext-lexical/lexical'

export const $createFullSubSection = (children: LexicalNode[]) => {
  const container = $createSubSectionContainer()
  const heading = $createSubSectionHeadingNode()
  const body = $createSubSectionContentNode()

  heading.append(...children)
  body.append($createParagraphNode())
  container.append(heading, body)

  return { container, heading, body }
}
