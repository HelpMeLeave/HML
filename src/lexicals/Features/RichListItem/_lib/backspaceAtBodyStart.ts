import { $bodyBlockAtCaret } from '@/lexicals/Features/RichListItem/_lib/bodyBlockAtCaret'
import { $isRichListItem } from '@/lexicals/Features/RichListItem/nodes'
import type { LexicalNode } from '@payloadcms/richtext-lexical/lexical'

/** Backspace at the very start of a body steps back into the title, dropping the line if it was empty. The body is a shadow root, so Lexical would otherwise do nothing. */
export const $backspaceAtBodyStart = (event: Nullish<KeyboardEvent>) => {
  const at = $bodyBlockAtCaret()
  if (!at || at.offset != 0) return false

  const { anchor, block, body } = at
  if (!block.is(body.getFirstChild())) return false

  for (let walk: LexicalNode = anchor; !walk.is(block); walk = walk.getParent()!) {
    if (walk.getPreviousSibling() !== null) return false
  }

  const item = body.getParent()
  if (!$isRichListItem(item)) return false

  event?.preventDefault()
  if (block.getTextContent() == '' && body.getChildrenSize() > 1) block.remove()
  item.getTitle()?.selectEnd()
  return true
}
