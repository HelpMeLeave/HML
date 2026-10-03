'use client'

import { isActive } from '@/_components/lexicals/Features/_lib/isActive'
import {
  $convertToTitledListNode,
  $isTitledListNode,
  $toggleTitled,
  TitledListNode,
} from '@/_components/lexicals/Features/ListTitleFeature'
import type { SlashMenuGroup, ToolbarGroup } from '@payloadcms/richtext-lexical'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import {
  type LexicalEditor,
  $getSelection,
  $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'
import { ListNode } from '@payloadcms/richtext-lexical/lexical/list'
import { $getNearestNodeOfType } from '@payloadcms/richtext-lexical/lexical/utils'
import { ListStart, TextCursor } from 'lucide-react'
import './style.scss'

const Icon = () => <ListStart />

const isEnabled = () => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return false
  return Boolean($getNearestNodeOfType(selection.anchor.getNode(), ListNode))
}

const itemConfig = {
  key: 'list-item-title',
  label: 'List Title',
  onSelect: ({ editor }: { editor: LexicalEditor }) => {
    editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      const node = $getNearestNodeOfType(selection.anchor.getNode(), ListNode)
      if (node) {
        if ($isTitledListNode(node)) {
          $toggleTitled(node)
        } else {
          const newNode = $convertToTitledListNode(node)
          node.replace(newNode, true)
        }
      }
    })
  },
}

const slashConfig: SlashMenuGroup = {
  key: 'list',
  items: [
    {
      ...itemConfig,
      Icon,
      keywords: ['list', 'title'],
    },
  ],
}

const toolbarConfig: ToolbarGroup = {
  key: 'text',
  type: 'dropdown' as const,
  maxActiveItems: 2,
  ChildComponent: () => <TextCursor />,
  items: [
    {
      ...itemConfig,
      key: 'list-item-title',
      label: 'List Title',
      ChildComponent: Icon,
      isEnabled,
      isActive: isActive(TitledListNode),
    },
  ],
}

const ListTitleClientFeature = createClientFeature({
  nodes: [TitledListNode],
  slashMenu: {
    groups: [slashConfig],
  },
  toolbarFixed: {
    groups: [toolbarConfig],
  },
  toolbarInline: {
    groups: [toolbarConfig],
  },
})

export default ListTitleClientFeature
