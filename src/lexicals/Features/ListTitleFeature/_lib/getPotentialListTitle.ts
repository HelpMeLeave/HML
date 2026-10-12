import { $isTitledListNode } from '@/lexicals/Features/ListTitleFeature'
import {
  $findMatchingParent,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'
import { $isListItemNode, $isListNode } from '@payloadcms/richtext-lexical/lexical/list'

/** With the caret in the first item of a list that has no title yet, the paragraph with text directly above that list. */
export const $getPotentialListTitle = () => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return null

  const anchor = selection.anchor.getNode()
  const list = anchor.getTopLevelElement()
  if (!$isListNode(list) || $isTitledListNode(list)) return null
  if (!$findMatchingParent(anchor, $isListItemNode)?.is(list.getFirstChild())) return null

  const block = list.getPreviousSibling()
  return $isParagraphNode(block) && block.getTextContent() ? block : null
}
