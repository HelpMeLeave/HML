import { applySerializedProps } from '@/_components/lexicals/Features/_lib/nodeUtils'
import {
  ElementNode,
  type LexicalNode,
  type SerializedElementNode,
} from '@payloadcms/richtext-lexical/lexical'

export class SectionContainerNode extends ElementNode {
  static getType() {
    return 'section-container'
  }

  static clone(node: SectionContainerNode) {
    return new SectionContainerNode(node.__key)
  }

  createDOM() {
    const el = document.createElement('section')
    el.className = 'lexical__section'
    return el
  }

  updateDOM() {
    return false
  }

  static importJSON(serialized: SerializedElementNode) {
    return applySerializedProps($createSectionContainerNode(), serialized)
  }

  exportJSON(): SerializedElementNode {
    return { ...super.exportJSON(), type: 'section-container' }
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

export class SectionContentNode extends ElementNode {
  static getType() {
    return 'section-content'
  }

  static clone(node: SectionContentNode) {
    return new SectionContentNode(node.__key)
  }

  createDOM() {
    const el = document.createElement('article')
    el.className = 'lexical__section-content'
    return el
  }

  updateDOM() {
    return false
  }

  static importJSON(serialized: SerializedElementNode) {
    return applySerializedProps($createSectionContentNode(), serialized)
  }

  exportJSON(): SerializedElementNode {
    return { ...super.exportJSON(), type: 'section-content' }
  }

  isInline() {
    return false
  }

  isShadowRoot() {
    return true
  }
}

export const $createSectionContainerNode = () => new SectionContainerNode()
export const $isSectionContainerNode = (
  node: LexicalNode | null | undefined
): node is SectionContainerNode => node instanceof SectionContainerNode

export const $createSectionContentNode = () => new SectionContentNode()
export const $isSectionContentNode = (
  node: LexicalNode | null | undefined
): node is SectionContentNode => node instanceof SectionContentNode
