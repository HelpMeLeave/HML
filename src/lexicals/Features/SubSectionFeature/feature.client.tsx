'use client'

import { insertContainerAtSelection } from '@/lexicals/Features/_lib/insertContainerAtSelection'
import { isActive } from '@/lexicals/Features/_lib/isActive'
import { $createFullSubSection } from '@/lexicals/Features/SubSectionFeature/_lib'
import { SubSectionPlugin } from '@/lexicals/Features/SubSectionFeature/Plugin'
import {
  $isSubSectionContainer,
  SubSectionContainerNode,
} from '@/lexicals/Features/SubSectionFeature/SubSectionContainerNode'
import { SubSectionContentNode } from '@/lexicals/Features/SubSectionFeature/SubSectionContentNode'
import { SubSectionHeadingNode } from '@/lexicals/Features/SubSectionFeature/SubSectionHeadingNode'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { type LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import type { ElementTransformer } from '@payloadcms/richtext-lexical/lexical/markdown'
import { $findMatchingParent } from '@payloadcms/richtext-lexical/lexical/utils'
import { Heading3 } from 'lucide-react'

const SubSectionMarkdownTransformer: ElementTransformer = {
  dependencies: [SubSectionContainerNode, SubSectionHeadingNode, SubSectionContentNode],
  export: (node) =>
    node instanceof SubSectionContainerNode ?
      ((node.getFirstChild() as SubSectionHeadingNode | null)?.markdownHeading() ?? null)
    : null,
  regExp: /^#{3}(?!#)\s/,
  replace: (parentNode, children) => {
    const { container, heading } = $createFullSubSection(children)
    const parent = parentNode.getParent()
    const enclosing = parent && $findMatchingParent(parent, $isSubSectionContainer)

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

const H3Icon = () => <Heading3 />

const insertConfig = {
  key: 'subsection-heading',
  label: 'Subsection',
  order: 2,
  onSelect: ({ editor }: { editor: LexicalEditor }) =>
    insertContainerAtSelection(editor, $createFullSubSection),
}

const SubSectionFeatureClient = createClientFeature({
  nodes: [SubSectionContainerNode, SubSectionHeadingNode, SubSectionContentNode],
  markdownTransformers: [SubSectionMarkdownTransformer],
  plugins: [{ Component: SubSectionPlugin, position: 'normal' }],
  slashMenu: {
    groups: [
      {
        key: 'layout',
        label: 'Layout',
        items: [{ Icon: H3Icon, keywords: ['subsection', 'heading', 'h3'], ...insertConfig }],
      },
    ],
  },
  toolbarFixed: {
    groups: [
      {
        key: 'layout',
        type: 'dropdown',
        ChildComponent: H3Icon,
        items: [
          { ...insertConfig, ChildComponent: H3Icon, isActive: isActive(SubSectionHeadingNode) },
        ],
      },
    ],
  },
})

export default SubSectionFeatureClient
