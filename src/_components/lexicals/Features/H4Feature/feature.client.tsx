'use client'

import { $createH4Node, H4Node } from '@/_components/lexicals/Features/H4Feature/H4Node'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical'
import type { ElementTransformer } from '@payloadcms/richtext-lexical/lexical/markdown'
import { Heading4 } from 'lucide-react'

const H4MarkdownTransformer: () => ElementTransformer = () => ({
  dependencies: [H4Node],
  export: (node) => {
    if (!(node instanceof H4Node)) return null
    return `#### ${node.getTextContent()}`
  },
  regExp: /^#{4}(?!#)\s/,
  replace: (parentNode, children) => {
    const node = $createH4Node()
    node.append(...children)
    parentNode.replace(node)
    node.select()
  },
  type: 'element',
})

const H4Icon = () => <Heading4 />

const insertConfig = () => ({
  key: 'h4',
  label: 'Small Heading',
  order: 4,
  onSelect: ({ editor }: { editor: LexicalEditor }) => {
    editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return
      const node = $createH4Node()
      selection.insertNodes([node])
      node.selectEnd()
    })
  },
})

export const H4Client = createClientFeature({
  nodes: [H4Node],
  markdownTransformers: [H4MarkdownTransformer()],
  slashMenu: {
    groups: [
      {
        key: 'layout',
        label: 'Basic',
        items: [
          {
            Icon: H4Icon,
            keywords: ['h4', 'heading', 'heading4', 'subheading'],
            ...insertConfig(),
          },
        ],
      },
    ],
  },
  toolbarFixed: {
    groups: [
      {
        key: 'layout',
        type: 'dropdown',
        ChildComponent: H4Icon,
        items: [{ ...insertConfig(), ChildComponent: H4Icon }],
      },
    ],
  },
})
