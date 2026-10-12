import { CheckmarkListNode } from '@/lexicals/Features/CheckmarkList/CheckmarkListNode'

export const $isCheckmarkListNode = (node: unknown): node is CheckmarkListNode =>
  node instanceof CheckmarkListNode
