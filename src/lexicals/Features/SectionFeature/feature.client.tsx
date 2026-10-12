'use client'

import { isActive } from '@/lexicals/Features/_lib/isActive'
import { $createFullSection } from '@/lexicals/Features/SectionFeature/$createFullSection'
import { SectionPlugin } from '@/lexicals/Features/SectionFeature/Plugin'
import {
  $isSectionHGroupNode,
  SectionEyebrowNode,
  SectionHeadingNode,
  SectionHGroupNode,
  SectionSubtitleNode,
} from '@/lexicals/Features/SectionFeature/SectionHGroupNodes'
import {
  $isSectionContainer,
  SectionContainerNode,
  SectionContentNode,
} from '@/lexicals/Features/SectionFeature/SectionStructureNodes'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import {
  type LexicalEditor,
  $getRoot,
  $getSelection,
  $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'
import type { ElementTransformer } from '@payloadcms/richtext-lexical/lexical/markdown'
import { $findMatchingParent } from '@payloadcms/richtext-lexical/lexical/utils'
import { Heading2 } from 'lucide-react'
import './style.scss'

const SectionMarkdownTransformer: ElementTransformer = {
  dependencies: [
    SectionContainerNode,
    SectionHGroupNode,
    SectionEyebrowNode,
    SectionSubtitleNode,
    SectionContentNode,
    SectionHeadingNode,
  ],
  export: (node) => {
    if (!(node instanceof SectionContainerNode)) return null

    const hgroup = node.getFirstChild()
    if (!$isSectionHGroupNode(hgroup)) return null

    const heading = hgroup.getChildren().find((child) => child instanceof SectionHeadingNode)

    return heading ? `## ${heading.getTextContent()}` : null
  },
  regExp: /^#{2}(?!#)\s/,
  replace: (parentNode, children) => {
    const { container, heading } = $createFullSection(children)
    const parent = parentNode.getParent()
    const enclosing = parent && $findMatchingParent(parent, $isSectionContainer)

    if (enclosing) {
      enclosing.insertAfter(container)
      parentNode.remove()
    } else {
      parentNode.replace(container)
    }

    heading.select(0, 0)
  },
  type: 'element',
}

const H2Icon = () => (
  <Heading2
    nonScalingStroke
    strokeWidth={'1.5px'}
  />
)

const insertConfig = {
  key: 'section-hgroup',
  label: 'Section',
  order: 1,
  onSelect: ({ editor }: { editor: LexicalEditor }) => {
    editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      const { container, hgroup } = $createFullSection([])
      const topLevel = selection.anchor.getNode().getTopLevelElement()
      if (topLevel) topLevel.insertAfter(container)
      else $getRoot().append(container)
      hgroup.getFirstChild()?.selectStart()
    })
  },
}

export default createClientFeature({
  nodes: [
    SectionContainerNode,
    SectionHGroupNode,
    SectionEyebrowNode,
    SectionSubtitleNode,
    SectionContentNode,
    SectionHeadingNode,
  ],
  markdownTransformers: [SectionMarkdownTransformer],
  plugins: [{ Component: SectionPlugin, position: 'normal' }],
  slashMenu: {
    groups: [
      {
        key: 'layout',
        items: [
          {
            Icon: H2Icon,
            keywords: ['section', 'heading', 'h2'],
            ...insertConfig,
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
        ChildComponent: H2Icon,
        items: [{ ...insertConfig, ChildComponent: H2Icon, isActive: isActive(SectionHGroupNode) }],
      },
    ],
  },
})
