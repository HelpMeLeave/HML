import { $createCheckmarkListItemNode } from '@/_components/lexicals/Features/CheckmarkList/CheckmarkListItemNode'
import { type LexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { type SerializedListNode, ListNode } from '@payloadcms/richtext-lexical/lexical/list'

export class CheckmarkListNode extends ListNode {
  static getType = () => 'checkmark-list'

  static clone = (node: CheckmarkListNode): CheckmarkListNode =>
    new CheckmarkListNode('check', node.__start, node.__key)

  static importJSON = (serialized: SerializedListNode): CheckmarkListNode => {
    const node = new CheckmarkListNode('check', serialized.start)
    node.setFormat(serialized.format)
    node.setIndent(serialized.indent)
    node.setDirection(serialized.direction)
    return node
  }

  createDOM(config: Parameters<ListNode['createDOM']>[0]): HTMLElement {
    const el = super.createDOM(config)
    el.className = 'checkmark-list LexicalEditorTheme__ul LexicalEditorTheme__checklist'
    return el
  }

  exportJSON(): SerializedListNode {
    return { ...super.exportJSON(), type: 'checkmark-list', listType: 'check' }
  }
}

export const $createCheckmarkListNode = (): CheckmarkListNode => new CheckmarkListNode('check', 1)

export const $isCheckmarkListNode = (node: unknown): node is CheckmarkListNode =>
  node instanceof CheckmarkListNode

export const $convertToCheckmarkListNode = (...children: LexicalNode[]): CheckmarkListNode => {
  return $createCheckmarkListNode().append($createCheckmarkListItemNode().append(...children))
}
