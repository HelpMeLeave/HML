import { $isRichListItemBody } from '@/lexicals/Features/RichListItem/nodes'
import { $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical'

/** The block directly inside a rich item's body that holds the caret, with that body. */
export const $bodyBlockAtCaret = () => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) return null

  const anchor = selection.anchor.getNode()
  const block = anchor.getTopLevelElement()
  const body = block?.getParent()
  if (!block || !$isRichListItemBody(body)) return null

  return { anchor, block, body, offset: selection.anchor.offset }
}
