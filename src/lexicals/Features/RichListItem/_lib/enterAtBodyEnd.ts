import { $bodyBlockAtCaret } from '@/lexicals/Features/RichListItem/_lib/bodyBlockAtCaret'
import { $createRichListItem, $isRichListItem } from '@/lexicals/Features/RichListItem/nodes'
import { $isParagraphNode } from '@payloadcms/richtext-lexical/lexical'

/** Enter on an empty last paragraph of a body starts the next item. */
export const $enterAtBodyEnd = (event: Nullish<KeyboardEvent>) => {
  if (event?.shiftKey) return false

  const at = $bodyBlockAtCaret()
  if (!at) return false

  const { block, body } = at
  if (!$isParagraphNode(block) || block.getTextContent() != '' || !block.is(body.getLastChild()))
    return false

  const item = body.getParent()
  if (!$isRichListItem(item)) return false

  event?.preventDefault()
  if (body.getChildrenSize() > 1) block.remove()

  const next = $createRichListItem(item.getChecked() == undefined ? undefined : false)
  item.insertAfter(next)
  next.getTitle()?.select()
  return true
}
