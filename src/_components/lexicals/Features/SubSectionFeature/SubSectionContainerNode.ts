import { applySerializedProps } from '@/_components/lexicals/Features/_lib/nodeUtils'
import {
  ElementNode,
  type LexicalNode,
  type SerializedElementNode,
} from '@payloadcms/richtext-lexical/lexical'

export class SubSectionContainerNode extends ElementNode {
  static getType() {
    return 'subsection-container'
  }

  static clone(node: SubSectionContainerNode) {
    return new SubSectionContainerNode(node.__key)
  }

  createDOM() {
    const el = document.createElement('section')
    el.className = 'lexical__subsection'
    return el
  }

  updateDOM() {
    return false
  }

  static importJSON(serialized: SerializedElementNode) {
    return applySerializedProps($createSubSectionContainerNode(), serialized)
  }

  exportJSON(): SerializedElementNode {
    return { ...super.exportJSON(), type: 'subsection-container' }
  }

  isInline() {
    return false
  }

  canBeEmpty() {
    return false
  }

  insertNewAfter() {
    return null
  }
}

export const $createSubSectionContainerNode = () => new SubSectionContainerNode()

export const $isSubSectionContainerNode = (
  node: LexicalNode | null | undefined
): node is SubSectionContainerNode => node instanceof SubSectionContainerNode
