import { applySerializedProps } from '@/_components/lexicals/Features/_lib/nodeUtils'
import {
  ElementNode,
  type LexicalNode,
  type SerializedElementNode,
} from '@payloadcms/richtext-lexical/lexical'

export class SubSectionContentNode extends ElementNode {
  static getType() {
    return 'subsection-content'
  }

  static clone(node: SubSectionContentNode) {
    return new SubSectionContentNode(node.__key)
  }

  createDOM() {
    const el = document.createElement('article')
    el.className = 'lexical__subsection-content'
    return el
  }

  updateDOM() {
    return false
  }

  static importJSON(serialized: SerializedElementNode) {
    return applySerializedProps($createSubSectionContentNode(), serialized)
  }

  exportJSON(): SerializedElementNode {
    return { ...super.exportJSON(), type: 'subsection-content' }
  }

  isInline() {
    return false
  }

  isShadowRoot() {
    return true
  }
}

export const $createSubSectionContentNode = () => new SubSectionContentNode()
export const $isSubSectionContentNode = (
  node: LexicalNode | null | undefined
): node is SubSectionContentNode => node instanceof SubSectionContentNode
