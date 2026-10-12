'use client'

import {
  $createCheckmarkListItemNode,
  CheckmarkListItemNode,
} from '@/lexicals/Features/CheckmarkList/CheckmarkListItemNode'
import {
  $convertToCheckmarkListNode,
  $createCheckmarkListNode,
  $isCheckmarkListNode,
  CheckmarkListNode,
} from '@/lexicals/Features/CheckmarkList/CheckmarkListNode'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import {
  type LexicalEditor,
  $getSelection,
  $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'
import { $isListItemNode } from '@payloadcms/richtext-lexical/lexical/list'
import type { ElementTransformer } from '@payloadcms/richtext-lexical/lexical/markdown'
import { CheckCircle } from 'lucide-react'

const CheckMarkIcon = () => <CheckCircle />

const CheckmarkMarkdownTransformer: ElementTransformer = {
  dependencies: [CheckmarkListNode, CheckmarkListItemNode],
  export: (node) =>
    $isCheckmarkListNode(node) ?
      node
        .getChildren()
        .map((child) => `-[x] ${child.getTextContent()}`)
        .join('\n')
    : null,
  regExp: /^-\[(x|\s)\]\s/,
  replace: (parentNode, children) => {
    const list = $convertToCheckmarkListNode(...children)
    list.getChildren().forEach((child) => $isListItemNode(child) && child.setChecked(false))
    parentNode.replace(list)
    const item = list.getLastChild()
    if ($isListItemNode(item)) item.select()
  },
  type: 'element',
}

const onSelect = ({ editor }: { editor: LexicalEditor }) =>
  editor.update(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return

    const list = $createCheckmarkListNode()
    list.append($createCheckmarkListItemNode())
    selection.insertNodes([list])
    list.select()
  })

export const CustomCheckmarkClient = createClientFeature({
  nodes: [CheckmarkListNode, CheckmarkListItemNode],
  markdownTransformers: [CheckmarkMarkdownTransformer],
  slashMenu: {
    groups: [
      {
        key: 'text',
        label: 'Text',
        items: [{ key: 'checkmark-list', label: 'Checkmark List', Icon: CheckMarkIcon, onSelect }],
      },
    ],
  },
  toolbarFixed: {
    groups: [
      {
        key: 'text',
        type: 'dropdown',
        ChildComponent: CheckMarkIcon,
        items: [
          {
            key: 'checkmark-list',
            label: 'Checkmark List',
            ChildComponent: CheckMarkIcon,
            onSelect,
          },
        ],
      },
    ],
  },
})
