import { applySerializedProps } from '@/_components/lexicals/Features/_lib/nodeUtils'
import {
  type EditorConfig,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
  buildImportMap,
  isHTMLElement,
} from '@payloadcms/richtext-lexical/lexical'
import {
  type ListType,
  type SerializedListNode,
  $createListItemNode,
  $createListNode,
  $isListItemNode,
  $isListNode,
  ListNode,
} from '@payloadcms/richtext-lexical/lexical/list'

export type SerializedTitledListNode = SerializedListNode & { titled: boolean }

export class TitledListNode extends ListNode {
  titled: boolean

  static getType = () => 'titled-list'

  static clone = (node: TitledListNode) => {
    return new TitledListNode(node.getListType(), node.getStart(), node.getTitled(), node.__key)
  }

  static importJSON = (serialized: SerializedTitledListNode) => {
    return applySerializedProps(
      $createTitledListNode(serialized.listType, serialized.start),
      serialized
    )
  }

  $config() {
    return this.config('titled-list', {
      extends: ListNode,
      importDOM: buildImportMap({
        ol: () => ({
          conversion: $domToTitledList,
          priority: 0,
        }),
        ul: () => ({
          conversion: $domToTitledList,
          priority: 0,
        }),
      }),
    })
  }

  constructor(type: ListType, start?: number, titled?: boolean, key?: NodeKey) {
    super(type, start, key)
    this.titled = titled ?? false
  }

  createDOM = (
    config: EditorConfig,
    _editor?: LexicalEditor
  ): HTMLOListElement | HTMLUListElement => {
    const el = super.createDOM(config, _editor) as HTMLOListElement | HTMLUListElement
    el.className += ' LexicalEditorTheme__list--titled'
    return el
  }

  exportJSON = (): SerializedTitledListNode => {
    return { ...super.exportJSON(), type: this.getType(), titled: this.getTitled() }
  }

  getTitled = () => this.titled
  isInline = () => false
}

export const $isTitledListNode = (node: LexicalNode) => node instanceof TitledListNode

export const $toggleTitled = (node: TitledListNode | ListNode) => {
  let newList: ListNode
  if ($isTitledListNode(node)) {
    newList = $createListNode(node.getListType(), node.getStart())
  } else if ($isListNode(node)) {
    newList = $convertToTitledListNode(node)
  } else {
    return
  }

  node.replace(newList, true)
  return node
}

const $createTitledListNode = (listType?: ListType, start?: number) => {
  return new TitledListNode(listType ?? 'bullet', start, true)
}

function isDomChecklist(domNode: HTMLElement) {
  if (
    domNode.getAttribute('__lexicallisttype') === 'check'
    || domNode.classList.contains('contains-task-list')
    || domNode.getAttribute('data-is-checklist') === '1'
  ) {
    return true
  }
  // if children are checklist items, the node is a checklist ul. Applicable for googledoc checklist pasting.
  for (const child of domNode.childNodes) {
    if (isHTMLElement(child) && child.hasAttribute('aria-checked')) {
      return true
    }
  }
  return false
}

function $normalizeChildren(nodes: LexicalNode[]) {
  const normalizedListItems = []
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if ($isListItemNode(node)) {
      normalizedListItems.push(node)
      const children = node.getChildren()
      if (children.length > 1) {
        children.forEach((child) => {
          if ($isListNode(child)) {
            normalizedListItems.push($wrapInListItem(child))
          }
        })
      }
    } else {
      normalizedListItems.push($wrapInListItem(node))
    }
  }
  return normalizedListItems
}

function $domToTitledList(domNode: HTMLOListElement | HTMLUListElement) {
  const nodeName = domNode.nodeName.toLowerCase()
  let node = null
  if (nodeName === 'ol') {
    // @ts-ignore
    const start = domNode.start
    node = $createTitledListNode('number', start)
  } else if (nodeName === 'ul') {
    if (isDomChecklist(domNode)) {
      node = $createTitledListNode('check')
    } else {
      node = $createTitledListNode('bullet')
    }
  }
  return {
    after: $normalizeChildren,
    node,
  }
}

export const $convertToTitledListNode = (node: ListNode) =>
  new TitledListNode(node.getListType(), node.getStart(), true)

const $wrapInListItem = (node: LexicalNode) => $createListItemNode().append(node)
