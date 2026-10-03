import { $findContentAncestor } from '@/_components/lexicals/Features/_lib/findContentAncestor'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  type ElementNode,
  type Klass,
  type LexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

/**
 * Handle Enter pressed on an empty line that is preceded by another empty line
 * inside a content node: remove both empty lines and eject a fresh paragraph
 * after the enclosing container (or after the content node itself when it is not
 * wrapped in a container). Returns `true` when it handled the event.
 */
export function $handleDoubleEnterEject<C extends ElementNode>(
  event: KeyboardEvent | null,
  contentNode: LexicalNode,
  directChild: LexicalNode,
  isContainer: (node: LexicalNode | null) => node is C
): boolean {
  const isEmpty = (node: LexicalNode) => node.getTextContent() === ''
  const prevSibling = directChild.getPreviousSibling()

  if (isEmpty(directChild) && prevSibling && isEmpty(prevSibling)) {
    event?.preventDefault()
    prevSibling.remove()
    directChild.remove()

    const paragraph = $createParagraphNode()
    const container = contentNode.getParent()
    if (isContainer(container)) {
      container.insertAfter(paragraph)
    } else {
      contentNode.insertAfter(paragraph)
    }

    paragraph.select()
    return true
  }

  return false
}

/** The Enter handler SubSection and Toggling SubSection share: find the content node around the caret, then run the double-Enter eject. */
export function $doubleEnterEjectFromSelection<C extends ElementNode>(
  event: KeyboardEvent | null,
  contentKlass: Klass<ElementNode>,
  isContainer: (node: LexicalNode | null) => node is C
): boolean {
  const selection = $getSelection()
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false

  const found = $findContentAncestor(selection.anchor.getNode(), contentKlass)
  if (!found) return false

  return $handleDoubleEnterEject(event, found.contentNode, found.directChild, isContainer)
}
