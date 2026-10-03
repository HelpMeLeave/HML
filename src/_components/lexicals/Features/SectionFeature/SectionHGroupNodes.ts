import { applySerializedProps } from '@/_components/lexicals/Features/_lib/nodeUtils'
import {
  type LexicalNode,
  type SerializedElementNode,
  ElementNode,
} from '@payloadcms/richtext-lexical/lexical'

export class SectionHGroupNode extends ElementNode {
  static getType = () => 'section-hgroup'
  static clone = (node: SectionHGroupNode) => new SectionHGroupNode(node.__key)
  static importJSON = (serialized: SerializedElementNode) =>
    applySerializedProps($createSectionHGroupNode(), serialized)

  createDOM = () => {
    const el = document.createElement('hgroup')
    el.className = 'lexical__hgroup hgroup'
    return el
  }

  exportJSON = () => ({ ...super.exportJSON(), type: this.getType() })
  updateDOM = () => false
  isInline = () => false
  canBeEmpty = () => false
  insertNewAfter = () => null
}

export class SectionHeadingNode extends ElementNode {
  static getType = () => 'section-heading'

  createDOM = () => {
    const el = document.createElement('h2')
    el.className = 'hgroup__section-heading'
    el.dataset.placeholder = 'Section Heading....'
    return el
  }

  static clone = (node: SectionHeadingNode) => new SectionHeadingNode(node.__key)

  static importJSON = (serialized: SerializedElementNode) =>
    applySerializedProps($createSectionHeadingNode(), serialized)

  updateDOM = () => false
  exportJSON = (): SerializedElementNode => ({ ...super.exportJSON(), type: 'section-heading' })
  isInline = () => false
}

export class SectionEyebrowNode extends ElementNode {
  static getType = () => 'section-eyebrow'
  static clone = (node: SectionEyebrowNode) => new SectionEyebrowNode(node.__key)
  static importJSON = (serialized: SerializedElementNode) =>
    applySerializedProps($createSectionEyebrowNode(), serialized)

  createDOM = () => {
    const el = document.createElement('p')
    el.className = 'hgroup__section-eyebrow'
    el.dataset.placeholder = 'Eyebrow...'
    return el
  }

  exportJSON = () => ({ ...super.exportJSON(), type: this.getType() })
  updateDOM = () => false
  isInline = () => false
  insertNewAfter = () => null
}

export class SectionSubtitleNode extends ElementNode {
  static getType = () => 'section-subtitle'
  static clone = (node: SectionSubtitleNode) => new SectionSubtitleNode(node.__key)
  static importJSON = (serialized: SerializedElementNode) =>
    applySerializedProps($createSectionSubtitleNode(), serialized)

  createDOM = () => {
    const el = document.createElement('p')
    el.className = 'hgroup__subtitle'
    el.dataset.placeholder = 'Subtitle...'
    return el
  }

  exportJSON = () => ({ ...super.exportJSON(), type: this.getType() })
  updateDOM = () => false
  isInline = () => false
  insertNewAfter = () => null
}

export const $isSectionHGroupNode = (node?: LexicalNode | null): node is SectionHGroupNode =>
  node instanceof SectionHGroupNode

export const $createSectionHGroupNode = () => new SectionHGroupNode()
export const $createSectionHeadingNode = () => new SectionHeadingNode()
export const $createSectionEyebrowNode = () => new SectionEyebrowNode()
export const $createSectionSubtitleNode = () => new SectionSubtitleNode()
