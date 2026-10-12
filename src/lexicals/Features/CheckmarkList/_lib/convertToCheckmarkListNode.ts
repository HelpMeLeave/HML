import { $createCheckmarkListNode } from '@/lexicals/Features/CheckmarkList/_lib/createCheckmarkListNode'
import { CheckmarkListNode } from '@/lexicals/Features/CheckmarkList/CheckmarkListNode'
import type { LexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { $createCheckmarkListItemNode } from './createCheckmarkListItemNode'

export const $convertToCheckmarkListNode = (...children: LexicalNode[]): CheckmarkListNode =>
  $createCheckmarkListNode().append($createCheckmarkListItemNode().append(...children))
