import {
  type RichListItemNode,
  RichListItemBodyNode,
  RichListItemTitleNode,
} from '@/lexicals/Features/RichListItem/nodes'
import { $create, $createParagraphNode, ElementNode } from '@payloadcms/richtext-lexical/lexical'

/** Every rich item holds exactly a title then a body; stray inline nodes go to the title, stray blocks to the body. */
export const $normalizeRichListItem = (item: RichListItemNode) => {
  const title = item.getTitle() ?? $create(RichListItemTitleNode)
  const body = item.getBody() ?? $create(RichListItemBodyNode)

  for (const child of item.getChildren()) {
    if (child.is(title) || child.is(body)) continue
    if (child instanceof ElementNode && !child.isInline()) body.append(child)
    else title.append(child)
  }

  const first = item.getFirstChild()
  if (!first) item.append(title)
  else if (!first.is(title)) first.insertBefore(title)
  if (!body.is(title.getNextSibling())) title.insertAfter(body)
  if (body.isEmpty()) body.append($createParagraphNode())
}
