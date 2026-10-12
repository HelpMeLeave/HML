'use client'

import { isActive } from '@/lexicals/Features/_lib/isActive'
import { calloutType } from '@/lexicals/Features/_lib/nodeStates'
import { $createCallout, CalloutNode } from '@/lexicals/Features/Callout/CalloutNode'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import {
  $getSelection,
  $getState,
  $isRangeSelection,
  $setState,
  type LexicalEditor,
} from '@payloadcms/richtext-lexical/lexical'
import type { ElementTransformer } from '@payloadcms/richtext-lexical/lexical/markdown'
import { Megaphone } from 'lucide-react'
import './style.scss'

const CalloutMarkdownTransformer: () => ElementTransformer = () => ({
  dependencies: [CalloutNode],
  regExp: /^>\[(.+)\]\s/,
  replace: (parentNode, children, match) => {
    const node = $createCallout()
    if (match) {
      $setState(node, calloutType, match[0])
    }
    node.append(...children)
    parentNode.replace(node)
    node.select()
  },
  type: 'element',
  export: (node) => {
    if (!(node instanceof CalloutNode)) return null
    return `>[${$getState(node, calloutType)}] ${node.getTextContent()}}`
  },
})

const CalloutIcon = () => <Megaphone />

const onSelect = ({ editor }: { editor: LexicalEditor }) =>
  editor.update(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return

    const callout = $createCallout()
    const selectionNodes = selection.extract()

    selection.insertNodes([callout])
    callout.append(...selectionNodes)
    callout.select()
  })

export default createClientFeature({
  nodes: [CalloutNode],
  markdownTransformers: [CalloutMarkdownTransformer()],
  slashMenu: {
    groups: [
      {
        key: 'add',
        items: [{ key: 'callout', label: 'Callout', Icon: CalloutIcon, onSelect }],
      },
    ],
  },
  toolbarFixed: {
    groups: [
      {
        key: 'add',
        type: 'dropdown',
        items: [
          {
            key: 'callout',
            label: 'Callout',
            ChildComponent: CalloutIcon,
            onSelect,
            isActive: isActive(CalloutNode),
          },
        ],
      },
    ],
  },
})
