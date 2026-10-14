import { $createRichListItem } from '@/lexicals/Features/RichListItem/nodes'
import { $isTextNode } from '@payloadcms/richtext-lexical/lexical'
import type { ListItemNode } from '@payloadcms/richtext-lexical/lexical/list'

/** Plain item → rich item: its text becomes the title and the caret moves into an empty body. */
export const $addDetails = (item: ListItemNode) => {
  const rich = $createRichListItem(item.getChecked())

  const children = item.getChildren()
  if (children.every($isTextNode) && children[0].hasFormat('bold')) {
    let toTitle = true
    children.forEach((child) => {
      if (!child.hasFormat('bold')) toTitle = false
      toTitle ? rich.getTitle()?.append(child) : rich.getBody()?.append(child)
    })
  } else {
    rich.getTitle()?.append(...item.getChildren())
  }

  item.replace(rich)
  rich.getBody()?.selectEnd()
}
