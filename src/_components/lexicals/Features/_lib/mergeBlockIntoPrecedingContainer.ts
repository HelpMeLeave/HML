import {
  $isSectionContainerNode,
  $isSectionContentNode,
} from '@/_components/lexicals/Features/SectionFeature/SectionStructureNodes'
import { $isSubSectionContainerNode } from '@/_components/lexicals/Features/SubSectionFeature/SubSectionContainerNode'
import { $isSubSectionContentNode } from '@/_components/lexicals/Features/SubSectionFeature/SubSectionContentNode'
import {
  type ElementNode,
  type LexicalNode,
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'

/** Collect the inline (non-element leaf) descendants of `node`, in document order. */
function collectInlineLeaves(node: LexicalNode): LexicalNode[] {
  if (!$isElementNode(node)) return [node]
  return node.getChildren().flatMap(collectInlineLeaves)
}

/** The content node of a Section/SubSection container, or null if `prev` isn't one. */
function contentNodeOfContainer(prev: LexicalNode): ElementNode | null {
  if ($isSectionContainerNode(prev)) {
    const last = prev.getLastChild()
    return $isSectionContentNode(last) ? last : null
  }
  if ($isSubSectionContainerNode(prev)) {
    const last = prev.getLastChild()
    return $isSubSectionContentNode(last) ? last : null
  }
  return null
}

/**
 * Backspace at the very start of a top-level block whose previous sibling is a
 * Section/SubSection container: merge the block into that container's content —
 * like a normal editor — instead of letting the default delete dissolve the
 * container's structure.
 *
 * - Empty block → remove it; cursor to the end of the container's content.
 * - Non-empty   → append its inline content to the container content's last
 *                 paragraph, remove the block, cursor at the join.
 *
 * Returns true when it handled the event.
 */
export function $mergeBlockIntoPrecedingContainer(event: KeyboardEvent | null): boolean {
  const selection = $getSelection()
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false
  if (selection.anchor.offset !== 0) return false

  const anchorNode = selection.anchor.getNode()

  // The top-level block (direct child of root) that contains the cursor. Null when the cursor is on the root itself.
  const block = anchorNode.getTopLevelElement()
  if (!block) return false

  // Only merge plain blocks (lists, paragraphs, …). If the block is itself a
  // structured container, leave it to that feature's own backspace logic.
  if ($isSectionContainerNode(block) || $isSubSectionContainerNode(block)) return false

  // Cursor must be at the very start of that block (all first-children on the way up).
  for (let walk: LexicalNode = anchorNode; walk !== block;) {
    if (walk.getPreviousSibling() !== null) return false
    const parent = walk.getParent()
    if (!parent) return false
    walk = parent
  }

  const prev = block.getPreviousSibling()
  if (!prev) return false
  const contentNode = contentNodeOfContainer(prev)
  if (!contentNode) return false

  event?.preventDefault()

  // Empty block → remove it, place cursor at the end of the container content.
  if (block.getTextContent() === '') {
    const cursorTarget = contentNode.getLastChild() ?? contentNode
    block.remove()
    cursorTarget.selectEnd()
    return true
  }

  // Non-empty block → merge its inline content into the container's last paragraph.
  let target: ElementNode
  const last = contentNode.getLastChild()
  if ($isElementNode(last)) {
    target = last
  } else {
    target = $createParagraphNode()
    contentNode.append(target)
  }

  const joinNode = target.getLastChild() ?? target
  for (const inline of collectInlineLeaves(block)) target.append(inline)
  block.remove()

  joinNode.selectEnd()
  return true
}
