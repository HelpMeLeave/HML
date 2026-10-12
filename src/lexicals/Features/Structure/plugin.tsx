'use client'

import {
  $isStructureContainer,
  $isStructureContent,
  $isStructureHeading,
} from '@/lexicals/Features/Structure/nodes'
import {
  type ElementNode,
  type LexicalNode,
  type RangeSelection,
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  KEY_BACKSPACE_COMMAND,
  KEY_ENTER_COMMAND,
} from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { $findMatchingParent, mergeRegister } from '@payloadcms/richtext-lexical/lexical/utils'
import { useEffect } from 'react'

const isEmptyLine = (node: LexicalNode) => node.getTextContent() == ''
const getAnchor = <T extends LexicalNode>(
  selection: RangeSelection,
  matcher: (node: Nullish<LexicalNode | T>) => node is T
) => {
  const anchor = selection.anchor.getNode()
  const el = $findMatchingParent(anchor, matcher)

  return {
    anchor,
    el,
  }
}

const $collectInlineLeaves = (node: LexicalNode): LexicalNode[] =>
  $isElementNode(node) ? node.getChildren().flatMap($collectInlineLeaves) : [node]

/** The block the caret sits at the very start of, or null. */
const $blockAtCaretStart = () => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection) || !selection.isCollapsed() || selection.anchor.offset !== 0)
    return null

  const anchor = selection.anchor.getNode()
  const block = anchor.getTopLevelElement()
  if (!block) return null

  for (let walk: LexicalNode = anchor; walk !== block;) {
    if (walk.getPreviousSibling() !== null) return null
    const parent = walk.getParent()
    if (!parent) return null
    walk = parent
  }

  return block
}

/** Backspace at the start of a block that follows a container pulls the block into that container's body. Lexical cannot route this one through collapseAtStart: the body is a shadow root, so the walk never reaches it from outside. */

const $mergeIntoPrecedingContainer = (event: Nullish<KeyboardEvent>) => {
  const block = $blockAtCaretStart()
  if (!block || $isStructureContainer(block)) return false

  const prev = block.getPreviousSibling()
  const content = $isStructureContainer(prev) ? prev.getContent() : null
  if (!content) return false

  event?.preventDefault()

  if (isEmptyLine(block)) {
    const cursorTarget = content.getLastChild() ?? content
    block.remove()
    cursorTarget.selectEnd()
    return true
  }

  const last = content.getLastChild()
  let target: ElementNode
  if ($isElementNode(last)) {
    target = last
  } else {
    target = $createParagraphNode()
    content.append(target)
  }

  const joinNode = target.getLastChild() ?? target
  for (const inline of $collectInlineLeaves(block)) target.append(inline)
  block.remove()

  joinNode.selectEnd()
  return true
}

/** Heading lines stay single-line, so Shift+Enter inside one is swallowed instead of inserting a line break. */
const $blockHeadingLineBreak = (event: Nullish<KeyboardEvent>) => {
  if (!event?.shiftKey) return false

  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return false
  if (!$findMatchingParent(selection.anchor.getNode(), $isStructureHeading)) return false

  event.preventDefault()
  return true
}

const $insertEjectedLine = (node: Nullish<ElementNode>) => {
  if (!node) return

  const paragraph = $createParagraphNode()
  const container = node.getParent()

  $isStructureContainer(container) ? container.insertAfter(paragraph) : node.insertAfter(paragraph)

  paragraph.select()
}

/** Enter on an empty line that already follows an empty line inside a body: drop both and carry on after the container. Belongs to the paragraph, which is Lexical's own node, so it stays a command. */
const $ejectOnDoubleEnter = (event: Nullish<KeyboardEvent>) => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false

  const { anchor, el } = getAnchor(selection, $isStructureContent)

  const block = anchor.getTopLevelElement()
  if (!el || !block || !el.is(block.getParent())) return false

  const prev = block.getPreviousSibling()
  if (!isEmptyLine(block) || !prev || !isEmptyLine(prev)) return false

  event?.preventDefault()
  prev.remove()
  block.remove()

  $insertEjectedLine(el)

  return true
}

/** The heading line the caret sits at the very start of, or null. */
const $headingAtCaretStart = () => {
  const selection = $getSelection()

  if (!$isRangeSelection(selection) || !selection.isCollapsed() || selection.anchor.offset !== 0) {
    return null
  }

  const { anchor, el } = getAnchor(selection, $isStructureHeading)

  if (!el) return null

  for (let walk: LexicalNode = anchor; !walk.is(el); walk = walk.getParent()!) {
    if (walk.getPreviousSibling() !== null) return null
  }

  return el
}

/** Backspace at the start of a heading line. Lexical merges adjacent blocks before it ever calls collapseAtStart, so the heading's own handler is routed here first. */
const $backspaceInHeading = (event: Nullish<KeyboardEvent>) => {
  const heading = $headingAtCaretStart()
  if (!heading) return false

  event?.preventDefault()
  return heading.collapseAtStart()
}

/** Enter at the very start of a container's first heading line opens an empty line above the container; the caret stays put. An empty first line keeps Enter's step down to the next line. */
const $enterAtHeadingStart = (event: Nullish<KeyboardEvent>) => {
  const heading = $headingAtCaretStart()

  if (!heading || isEmptyLine(heading) || $isStructureHeading(heading.getPreviousSibling()))
    return false

  const container = $findMatchingParent(heading, $isStructureContainer)
  if (!container) return false

  event?.preventDefault()
  container.insertBefore($createParagraphNode())
  return true
}

/** The cases Lexical's own Enter/Backspace routing cannot reach; everything else lives on the nodes. */
export const StructurePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(
    () =>
      mergeRegister(
        editor.registerCommand(
          KEY_BACKSPACE_COMMAND,
          (event) => $backspaceInHeading(event) || $mergeIntoPrecedingContainer(event),
          COMMAND_PRIORITY_HIGH
        ),
        editor.registerCommand(
          KEY_ENTER_COMMAND,
          (event) =>
            $blockHeadingLineBreak(event)
            || $enterAtHeadingStart(event)
            || $ejectOnDoubleEnter(event),
          COMMAND_PRIORITY_HIGH
        )
      ),
    [editor]
  )

  return null
}
