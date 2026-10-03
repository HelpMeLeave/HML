'use client'

import { clearSectionNode } from '@/_components/lexicals/Features/_lib/clearSectionNode'
import { $ejectOnEmptyHeading } from '@/_components/lexicals/Features/_lib/ejectOnEmptyHeading'
import { $findContentAncestor } from '@/_components/lexicals/Features/_lib/findContentAncestor'
import { $handleDoubleEnterEject } from '@/_components/lexicals/Features/_lib/handleDoubleEnterEject'
import { isActive } from '@/_components/lexicals/Features/_lib/isActive'
import { $mergeBlockIntoPrecedingContainer } from '@/_components/lexicals/Features/_lib/mergeBlockIntoPrecedingContainer'
import { registerHeadingToContainer } from '@/_components/lexicals/Features/_lib/registerHeadingToContainer'
import {
  $createSectionEyebrowNode,
  $createSectionHeadingNode,
  $createSectionHGroupNode,
  $createSectionSubtitleNode,
  $isSectionHGroupNode,
  SectionEyebrowNode,
  SectionHeadingNode,
  SectionHGroupNode,
  SectionSubtitleNode,
} from '@/_components/lexicals/Features/SectionFeature/SectionHGroupNodes'
import {
  $createSectionContainerNode,
  $createSectionContentNode,
  $isSectionContainerNode,
  $isSectionContentNode,
  SectionContainerNode,
  SectionContentNode,
} from '@/_components/lexicals/Features/SectionFeature/SectionStructureNodes'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import {
  type LexicalEditor,
  type LexicalNode,
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  KEY_BACKSPACE_COMMAND,
  KEY_ENTER_COMMAND,
} from '@payloadcms/richtext-lexical/lexical'
import type { ElementTransformer } from '@payloadcms/richtext-lexical/lexical/markdown'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { HeadingNode } from '@payloadcms/richtext-lexical/lexical/rich-text'
import { Heading2 } from 'lucide-react'
import { useEffect } from 'react'
import './style.scss'

function $createFullSection(h2Children: LexicalNode[]) {
  const section = $createSectionContainerNode()
  const hgroup = $createSectionHGroupNode()
  const h2 = $createSectionHeadingNode()
  h2.append(...h2Children)
  hgroup.append($createSectionEyebrowNode(), h2, $createSectionSubtitleNode())
  const body = $createSectionContentNode()
  body.append($createParagraphNode())
  section.append(hgroup, body)
  return { section, hgroup, h2, body }
}

const SectionMarkdownTransformer: ElementTransformer = {
  dependencies: [
    HeadingNode,
    SectionContainerNode,
    SectionHGroupNode,
    SectionEyebrowNode,
    SectionSubtitleNode,
    SectionContentNode,
  ],
  export: (node) => {
    if (!$isSectionContainerNode(node)) return null
    const hgroup = node.getFirstChild()
    if (!$isSectionHGroupNode(hgroup)) return null
    const h2 = hgroup.getChildren().find((c) => c.getType() === 'section-heading')
    return h2 ? `## ${h2.getTextContent()}` : null
  },
  regExp: /^#{2}(?!#)\s/,
  replace: (parentNode, children) => {
    const directParent = parentNode.getParent()
    const { section, h2 } = $createFullSection(children)

    if ($isSectionContainerNode(directParent)) {
      directParent.insertAfter(section)
      parentNode.remove()
      h2.select(0, 0)
      return
    }

    let walker: LexicalNode | null = directParent
    while (walker) {
      if ($isSectionContainerNode(walker)) {
        walker.insertAfter(section)
        parentNode.remove()
        h2.select(0, 0)
        return
      }
      walker = walker.getParent()
    }

    parentNode.replace(section)
    h2.select(0, 0)
  },
  type: 'element',
}

const SectionPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const offEnter = editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false

        const anchorNode = selection.anchor.getNode()

        let current: LexicalNode = anchorNode
        let contentNode: LexicalNode | null = null
        let directChild: LexicalNode | null = null

        while (current) {
          const parent = current.getParent()
          if (!parent) break
          if ($isSectionHGroupNode(parent)) {
            event?.preventDefault()
            const next = current.getNextSibling()
            if (next) {
              next.selectStart()
            } else {
              contentNode = parent.getNextSibling()
              if ($isSectionContentNode(contentNode)) {
                contentNode.getFirstChild()?.selectStart()
              }
            }
            return true
          }
          if ($isSectionContentNode(parent)) {
            contentNode = parent
            directChild = current
            break
          }
          current = parent
        }

        if (!contentNode || !directChild) return false

        return $handleDoubleEnterEject(event, contentNode, directChild, $isSectionContainerNode)
      },
      3
    )

    const offBackspace = editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      (event) => {
        if ($mergeBlockIntoPrecedingContainer(event)) return true

        const selection = $getSelection()
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false
        if (selection.anchor.offset !== 0) return false

        const anchorNode = selection.anchor.getNode()
        if (
          $ejectOnEmptyHeading(event, anchorNode.getParent(), {
            isHeading: $isSectionHGroupNode,
            isContainer: $isSectionContainerNode,
            isContent: $isSectionContentNode,
          })
        )
          return true
        const res = $findContentAncestor(anchorNode, SectionContentNode)
        return clearSectionNode(event, res?.contentNode ?? null, res?.directChild ?? null)
      },
      3
    )
    const offTransform = registerHeadingToContainer(editor, {
      tag: 'h2',
      skipParent: (parent) => $isSectionHGroupNode(parent) || $isSectionContentNode(parent),
      isContainer: $isSectionContainerNode,
      build: (children) => {
        const { section, body } = $createFullSection(children)
        return { container: section, body }
      },
    })

    return () => {
      offEnter()
      offBackspace()
      offTransform()
    }
  }, [editor])

  return null
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

      const { section, hgroup } = $createFullSection([])
      const topLevel = selection.anchor.getNode().getTopLevelElement()
      if (topLevel) topLevel.insertAfter(section)
      else $getRoot().append(section)
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
