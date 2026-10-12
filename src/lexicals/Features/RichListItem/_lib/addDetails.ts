import { $createRichListItem } from '@/lexicals/Features/RichListItem/nodes'
import type { ListItemNode } from '@payloadcms/richtext-lexical/lexical/list'

/** Plain item → rich item: its text becomes the title and the caret moves into an empty body. */
export const $addDetails = (item: ListItemNode) => {
  const rich = $createRichListItem(item.getChecked())
  rich.getTitle()?.append(...item.getChildren())
  item.replace(rich)
  rich.getBody()?.selectStart()
}
