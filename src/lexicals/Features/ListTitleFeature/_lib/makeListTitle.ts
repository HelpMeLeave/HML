import { $convertToTitledListNode, $isTitledListNode } from '@/lexicals/Features/ListTitleFeature'
import type { ElementNode } from '@payloadcms/richtext-lexical/lexical'
import { $createListItemNode, $isListNode } from '@payloadcms/richtext-lexical/lexical/list'

/** Moves `paragraph`'s content into a title item at the top of the untitled list right below it. */
export const $makeListTitle = (paragraph: ElementNode) => {
  const list = paragraph.getNextSibling()
  if (!$isListNode(list) || $isTitledListNode(list)) return

  const titled = $convertToTitledListNode(list)
  list.replace(titled, true)

  const title = $createListItemNode().append(...paragraph.getChildren())
  const first = titled.getFirstChild()
  if (first) first.insertBefore(title)
  else titled.append(title)

  paragraph.remove()
  title.selectEnd()
}
