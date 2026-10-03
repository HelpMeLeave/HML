'use client'

import {
  $createCheckmarkListItemNode,
  CheckmarkListItemNode,
} from '@/_components/lexicals/Features/CheckmarkList/CheckmarkListItemNode'
import {
  $convertToCheckmarkListNode,
  $createCheckmarkListNode,
  $isCheckmarkListNode,
  CheckmarkListNode,
} from '@/_components/lexicals/Features/CheckmarkList/CheckmarkListNode'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import {
  type ElementNode,
  type LexicalEditor,
  type LexicalNode,
  $getSelection,
  $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'
import type { ElementTransformer } from '@payloadcms/richtext-lexical/lexical/markdown'
import { CheckCircle } from 'lucide-react'

const CheckMarkIcon = () => <CheckCircle />

const onSelect = ({ editor }: { editor: LexicalEditor }) =>
  editor.update(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return

    const list = $createCheckmarkListNode()
    list.append($createCheckmarkListItemNode())
    selection.insertNodes([list])
    // select() already makes this the editor's selection
    list.select()
  })

export const CustomCheckmarkClient = createClientFeature({
  nodes: [CheckmarkListNode, CheckmarkListItemNode],
  markdownTransformers: [
    {
      dependencies: [CheckmarkListNode, CheckmarkListItemNode],
      export: (node: ElementNode) => {
        if ($isCheckmarkListNode(node)) {
          return node
            .getChildren()
            .map((child) => `-[x] ${child.getTextContent()}`)
            .join('\n')
        }
        return null
      },
      regExp: /^-\[x\]\s/,
      replace: (parentNode: ElementNode, children: LexicalNode[]) => {
        const list = $convertToCheckmarkListNode(...children)
        parentNode.replace(list)
        list.getLastChild<CheckmarkListItemNode>()?.select()
      },
      type: 'element',
    } as unknown as ElementTransformer,
  ],
  slashMenu: {
    groups: [
      {
        key: 'text',
        label: 'Text',
        items: [
          {
            key: 'checkmark-list',
            label: 'Checkmark List',
            Icon: CheckMarkIcon,
            onSelect,
          },
        ],
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
