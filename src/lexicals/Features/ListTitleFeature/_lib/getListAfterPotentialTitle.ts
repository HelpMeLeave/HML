import { $getPotentialListTitle } from '@/lexicals/Features/ListTitleFeature/_lib/getPotentialListTitle'
import { $isListNode } from '@payloadcms/richtext-lexical/lexical/list'

export const $getListAfterPotentialTitle = () => {
  const list = $getPotentialListTitle()
  const sibling = list?.getNextSibling()

  if (!$isListNode(sibling)) return null

  return sibling
}
