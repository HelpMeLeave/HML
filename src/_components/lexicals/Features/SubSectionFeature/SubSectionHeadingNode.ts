import { headingIdState } from '@/_components/lexicals/Features/_lib/nodeStates'
import {
  type LexicalNode,
  $create,
  $createParagraphNode,
  ElementNode,
} from '@payloadcms/richtext-lexical/lexical'

export class SubSectionHeadingNode extends ElementNode {
  $config() {
    return this.config('subsection-heading', {
      extends: ElementNode,
      stateConfigs: [{ stateConfig: headingIdState, flat: true }],
    })
  }

  createDOM() {
    const el = document.createElement('h3')
    el.className = 'lexical__subsection-heading'
    el.dataset.placeholder = 'Subsection heading...'
    return el
  }

  updateDOM() {
    return false
  }

  isInline() {
    return false
  }

  insertNewAfter() {
    const nextSibling = this.getNextSibling()
    if (nextSibling && nextSibling.getType() === 'subsection-content') {
      const firstChild = (nextSibling as ElementNode).getFirstChild()
      if (firstChild) {
        firstChild.selectStart()
        return null
      }
    }
    // Fallback if structure is unexpected
    const paragraph = $createParagraphNode()
    this.insertAfter(paragraph)
    return paragraph
  }
}

export const $createSubSectionHeadingNode = () => $create(SubSectionHeadingNode)
export const $isSubSectionHeadingNode = (
  node: LexicalNode | null | undefined
): node is SubSectionHeadingNode => node instanceof SubSectionHeadingNode
