import { $findMatchingParent } from '@payloadcms/richtext-lexical/lexical'
import {
  type ListItemNode,
  type ListNode,
  $isListItemNode,
  $isListNode,
} from '@payloadcms/richtext-lexical/lexical/list'

export const $getListItem = (list: ListNode | ListItemNode, nth: number) => {
  if ($isListItemNode(list)) {
    const parent = $findMatchingParent(list, $isListNode)
    if (parent) list = parent
  }
  if ($isListNode(list)) {
    return list.getChildAtIndex(nth) as ListItemNode
  }
  return null
}
