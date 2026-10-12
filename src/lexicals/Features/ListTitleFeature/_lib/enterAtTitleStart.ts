import { TitledListNode } from '@/lexicals/Features/ListTitleFeature'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  type LexicalNode,
} from '@payloadcms/richtext-lexical/lexical'
import { $getNearestNodeOfType } from '@payloadcms/richtext-lexical/lexical/utils'

/** Enter at the very start of a list title with text opens a plain paragraph above the list instead of a new first item, which would take over as the title. */
export const $enterAtTitleStart = (event: KeyboardEvent | null) => {
  if (event?.shiftKey) return false

  const selection = $getSelection()
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false
  if (selection.anchor.offset !== 0) return false

  const anchor = selection.anchor.getNode()
  const list = $getNearestNodeOfType(anchor, TitledListNode)
  const title = list?.getFirstChild()
  if (!list || !title || title.getTextContent() == '') return false

  for (let walk: LexicalNode = anchor; !walk.is(title); walk = walk.getParent()!)
    if (walk.is(list) || walk.getPreviousSibling() !== null) return false

  event?.preventDefault()
  list.insertBefore($createParagraphNode())
  return true
}
