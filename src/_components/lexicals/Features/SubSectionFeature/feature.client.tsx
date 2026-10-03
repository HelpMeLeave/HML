'use client'

import { clearSectionNode } from '@/_components/lexicals/Features/_lib/clearSectionNode'
import { $ejectOnEmptyHeading } from '@/_components/lexicals/Features/_lib/ejectOnEmptyHeading'
import { $findContentAncestor } from '@/_components/lexicals/Features/_lib/findContentAncestor'
import { $doubleEnterEjectFromSelection } from '@/_components/lexicals/Features/_lib/handleDoubleEnterEject'
import { insertContainerAtSelection } from '@/_components/lexicals/Features/_lib/insertContainerAtSelection'
import { $mergeBlockIntoPrecedingContainer } from '@/_components/lexicals/Features/_lib/mergeBlockIntoPrecedingContainer'
import { registerHeadingToContainer } from '@/_components/lexicals/Features/_lib/registerHeadingToContainer'
import {
  $createSubSectionContainerNode,
  $isSubSectionContainerNode,
  SubSectionContainerNode,
} from '@/_components/lexicals/Features/SubSectionFeature/SubSectionContainerNode'
import {
  $createSubSectionContentNode,
  $isSubSectionContentNode,
  SubSectionContentNode,
} from '@/_components/lexicals/Features/SubSectionFeature/SubSectionContentNode'
import {
  $createSubSectionHeadingNode,
  $isSubSectionHeadingNode,
  SubSectionHeadingNode,
} from '@/_components/lexicals/Features/SubSectionFeature/SubSectionHeadingNode'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import type { LexicalEditor, LexicalNode } from '@payloadcms/richtext-lexical/lexical'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  KEY_BACKSPACE_COMMAND,
  KEY_ENTER_COMMAND,
} from '@payloadcms/richtext-lexical/lexical'
import type { ElementTransformer } from '@payloadcms/richtext-lexical/lexical/markdown'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { Heading3 } from 'lucide-react'
import { useEffect } from 'react'

/** Build a SubSectionContainerNode: heading (populated) + content (empty paragraph). */
function $createFullSubSection(headingChildren: LexicalNode[]) {
  const container = $createSubSectionContainerNode()
  const heading = $createSubSectionHeadingNode()
  heading.append(...headingChildren)
  const body = $createSubSectionContentNode()
  body.append($createParagraphNode())
  container.append(heading, body)
  return { container, heading, body }
}

const SubSectionMarkdownTransformer: ElementTransformer = {
  dependencies: [SubSectionContainerNode, SubSectionHeadingNode, SubSectionContentNode],
  export: (node) => {
    if (!$isSubSectionContainerNode(node)) return null
    const heading = node.getFirstChild()
    if (!$isSubSectionHeadingNode(heading)) return null
    return `### ${heading.getTextContent()}`
  },
  regExp: /^#{3}(?!#)\s/,
  replace: (parentNode, children) => {
    const directParent = parentNode.getParent()
    const { container, body } = $createFullSubSection(children)
    const firstBodyChild = body.getFirstChild()

    if ($isSubSectionContentNode(directParent)) {
      const currentSubContainer = directParent.getParent()
      if ($isSubSectionContainerNode(currentSubContainer)) {
        currentSubContainer.insertAfter(container)
        parentNode.remove()
        firstBodyChild?.selectStart()
        return
      }
    }

    parentNode.replace(container)
    firstBodyChild?.selectStart()
  },
  type: 'element',
}

const SubSectionPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const offBackspace = editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      (event) => {
        if ($mergeBlockIntoPrecedingContainer(event)) return true

        const selection = $getSelection()
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false
        if (selection.anchor.offset !== 0) return false

        const anchorNode = selection.anchor.getNode()
        if (
          $ejectOnEmptyHeading(event, anchorNode, {
            isHeading: $isSubSectionHeadingNode,
            isContainer: $isSubSectionContainerNode,
            isContent: $isSubSectionContentNode,
          })
        )
          return true

        const found = $findContentAncestor(anchorNode, SubSectionContentNode)
        return clearSectionNode(event, found?.contentNode ?? null, found?.directChild ?? null)
      },
      COMMAND_PRIORITY_HIGH
    )

    const offEnter = editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) =>
        $doubleEnterEjectFromSelection(event, SubSectionContentNode, $isSubSectionContainerNode),
      COMMAND_PRIORITY_HIGH
    )

    const offTransform = registerHeadingToContainer(editor, {
      tag: 'h3',
      skipParent: (parent) =>
        $isSubSectionContainerNode(parent) || $isSubSectionContentNode(parent),
      isContainer: $isSubSectionContainerNode,
      build: $createFullSubSection,
    })

    return () => {
      offBackspace()
      offEnter()
      offTransform()
    }
  }, [editor])

  return null
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
        items: [
          {
            Icon: H3Icon,
            keywords: ['subsection', 'heading', 'h3'],
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
        ChildComponent: H3Icon,
        items: [{ ...insertConfig, ChildComponent: H3Icon }],
      },
    ],
  },
})

export default SubSectionFeatureClient
