import { $getAtCaret } from '@/lexicals/Features/_lib/getAtCaret'
import { $isListItemNode, ListItemNode } from '@payloadcms/richtext-lexical/lexical/list'

/** The list item holding the caret. */
export const $getListItemAtCaret = () => $getAtCaret<ListItemNode>($isListItemNode)
