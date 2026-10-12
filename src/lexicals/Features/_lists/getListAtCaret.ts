import { $getAtCaret } from '@/lexicals/Features/_lib/getAtCaret'
import { $isListNode, ListNode } from '@payloadcms/richtext-lexical/lexical/list'

export const $getListAtCaret = () => $getAtCaret<ListNode>($isListNode)
