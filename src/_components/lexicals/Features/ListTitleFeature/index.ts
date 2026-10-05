import { titledState } from '@/_components/lexicals/Features/_lib/nodeStates'
import {
  type EditorConfig,
  type LexicalEditor,
  type LexicalNode,
  $create,
  $getState,
  $setState,
  buildImportMap,
  isHTMLElement,
} from '@payloadcms/richtext-lexical/lexical'
import {
  type ListType,
  $createListItemNode,
  $createListNode,
  $isListItemNode,
  $isListNode,
  ListNode,
} from '@payloadcms/richtext-lexical/lexical/list'

export class TitledListNode extends ListNode {
  $config() {
    return this.config('titled-list', {
      extends: ListNode,
      stateConfigs: [{ stateConfig: titledState, flat: true }],
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

  createDOM(config: EditorConfig, _editor?: LexicalEditor): HTMLOListElement | HTMLUListElement {
    const el = super.createDOM(config, _editor) as HTMLOListElement | HTMLUListElement
    el.className += ' LexicalEditorTheme__list--titled'
    return el
  }

  getTitled() {
    return $getState(this, titledState)
  }

  isInline() {
    return false
  }
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

const $createTitledListNode = (listType?: ListType, start?: number) =>
  $setState(
    $create(TitledListNode)
      .setListType(listType ?? 'bullet')
      .setStart(start ?? 1),
    titledState,
    true
  )

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
  $setState(
    $create(TitledListNode).setListType(node.getListType()).setStart(node.getStart()),
    titledState,
    true
  )

const $wrapInListItem = (node: LexicalNode) => $createListItemNode().append(node)
