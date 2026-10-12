import {
  $findMatchingParent,
  $getSelection,
  $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'
import { $isListItemNode } from '@payloadcms/richtext-lexical/lexical/list'

/** The list item holding the caret. */
export const $getListItemAtCaret = () => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return null
  return $findMatchingParent(selection.anchor.getNode(), $isListItemNode)
}
