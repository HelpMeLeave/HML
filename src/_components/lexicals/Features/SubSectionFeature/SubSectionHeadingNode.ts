import { applySerializedProps } from '@/_components/lexicals/Features/_lib/nodeUtils'
import {
  $createParagraphNode,
  ElementNode,
  type LexicalNode,
  type SerializedElementNode,
} from '@payloadcms/richtext-lexical/lexical'

export class SubSectionHeadingNode extends ElementNode {
  static getType() {
    return 'subsection-heading'
  }

  static clone(node: SubSectionHeadingNode) {
    return new SubSectionHeadingNode(node.__key)
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

  static importJSON(serialized: SerializedElementNode) {
    return applySerializedProps($createSubSectionHeadingNode(), serialized)
  }

  exportJSON(): SerializedElementNode {
    return { ...super.exportJSON(), type: 'subsection-heading' }
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

export const $createSubSectionHeadingNode = () => new SubSectionHeadingNode()
export const $isSubSectionHeadingNode = (
  node: LexicalNode | null | undefined
): node is SubSectionHeadingNode => node instanceof SubSectionHeadingNode
