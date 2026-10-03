import { applySerializedProps } from '@/_components/lexicals/Features/_lib/nodeUtils'
import {
  $createParagraphNode,
  ElementNode,
  type SerializedElementNode,
} from '@payloadcms/richtext-lexical/lexical'

export class H4Node extends ElementNode {
  static getType = () => 'h4'
  static clone = (node: H4Node) => new H4Node(node.__key)
  static importJSON = (serialized: SerializedElementNode) =>
    applySerializedProps($createH4Node(), serialized)

  updateDOM = () => false
  isInline = () => false

  createDOM = () => {
    const el = document.createElement('h4')
    el.className = 'lexical__h4'
    return el
  }
  exportJSON(): SerializedElementNode {
    return { ...super.exportJSON(), type: 'h4' }
  }

  insertNewAfter = () => {
    const paragraph = $createParagraphNode()
    this.insertAfter(paragraph)
    return paragraph
  }
}

export const $createH4Node = () => new H4Node()
