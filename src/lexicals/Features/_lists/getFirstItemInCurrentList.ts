import { $getListItem } from '@/lexicals/Features/_lists/getListItem'
import { type ListItemNode, type ListNode } from '@payloadcms/richtext-lexical/lexical/list'

export const $getFirstItemInCurrentList = (node: Nullish<ListNode | ListItemNode>) =>
  node && $getListItem(node, 0)
