import {
  $isSectionContainerNode,
  type SectionContentNode,
} from '@/_components/lexicals/Features/SectionFeature/SectionStructureNodes'
import { $isSubSectionContainerNode } from '@/_components/lexicals/Features/SubSectionFeature/SubSectionContainerNode'
import { type SubSectionContentNode } from '@/_components/lexicals/Features/SubSectionFeature/SubSectionContentNode'
import { $createParagraphNode, type LexicalNode } from '@payloadcms/richtext-lexical/lexical'

export const clearSectionNode = (
  event: KeyboardEvent,
  contentNode: SubSectionContentNode | SectionContentNode | null,
  directChild: LexicalNode | null
) => {
  if (!contentNode || !directChild) return false
  if (directChild.getPreviousSibling() !== null) return false
  if (directChild.getNextSibling() !== null) return false
  if (directChild.getTextContent() !== '') return false

  event?.preventDefault()
  const paragraph = $createParagraphNode()
  const container = contentNode.getParent()
  if ($isSectionContainerNode(container) || $isSubSectionContainerNode(container)) {
    container.insertAfter(paragraph)
    container.remove()
  } else {
    contentNode.insertAfter(paragraph)
    contentNode.remove()
  }
  paragraph.select()
  return true
}
