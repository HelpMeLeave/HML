import {
  type EditorConfig,
  type LexicalNode,
  type RangeSelection,
  $create,
  $createParagraphNode,
  // $findMatchingParent,
  // $getSelection,
  $isParagraphNode,
  // $isRangeSelection,
  ElementNode,
} from '@payloadcms/richtext-lexical/lexical'
import {
  $createListItemNode,
  // $isListItemNode,
  ListItemNode,
} from '@payloadcms/richtext-lexical/lexical/list'

const $isEmptyParagraph = (node: LexicalNode) =>
  $isParagraphNode(node) && node.getTextContent() == ''

/** A list item with a single-line title and a body that holds any blocks (paragraphs, callouts, …). */
export class RichListItemNode extends ListItemNode {
  $config() {
    return this.config('rich-list-item', { extends: ListItemNode })
  }

  createDOM(config: EditorConfig): HTMLElement {
    const el = super.createDOM(config)
    el.classList.add('rich-list-item')
    return el
  }

  getTitle() {
    return this.getChildren().find($isRichListItemTitle) ?? null
  }

  getBody() {
    return this.getChildren().find($isRichListItemBody) ?? null
  }

  isBodyEmpty() {
    return this.getBody()?.getChildren().every($isEmptyParagraph) ?? true
  }

  /** Stops ListItemNode from flattening paragraphs into the item. */
  canMergeWith() {
    return false
  }

  insertNewAfter(_: RangeSelection, restoreSelection = true) {
    const next = $createRichListItem()
    this.insertAfter(next, restoreSelection)
    return next
  }

  /** Backspace at the start of the title: an empty body turns the item back into a plain one; otherwise the structure is kept. */
  collapseAtStart() {
    if (this.isBodyEmpty()) $removeDetails(this)
    return true
  }
}

export class RichListItemTitleNode extends ElementNode {
  $config() {
    return this.config('rich-list-item-title', {})
  }

  createDOM() {
    const el = document.createElement('p')
    el.className = 'rich-list-item__title'
    return el
  }

  updateDOM() {
    return false
  }

  /** Enter moves into the body instead of splitting the title. A fully blank item turns back into a plain one. */
  insertNewAfter() {
    const item = this.getParent()
    if (!$isRichListItem(item)) return null

    if (this.getTextContent() == '' && item.isBodyEmpty()) {
      $removeDetails(item)
      return null
    }

    const body = item.getBody()
    const first = body?.getFirstChild()
    if (first) first.selectStart()
    else body?.append($createParagraphNode()).selectStart()
    return null
  }
}

export class RichListItemBodyNode extends ElementNode {
  $config() {
    return this.config('rich-list-item-body', {})
  }

  createDOM() {
    const el = document.createElement('div')
    el.className = 'rich-list-item__body'
    return el
  }

  updateDOM() {
    return false
  }

  isShadowRoot() {
    return true
  }
}

export const $isRichListItem = (node: Nullish<LexicalNode>): node is RichListItemNode =>
  node instanceof RichListItemNode

export const $isRichListItemTitle = (node: Nullish<LexicalNode>): node is RichListItemTitleNode =>
  node instanceof RichListItemTitleNode

export const $isRichListItemBody = (node: Nullish<LexicalNode>): node is RichListItemBodyNode =>
  node instanceof RichListItemBodyNode

export const $createRichListItem = (checked?: boolean) => {
  const item = $create(RichListItemNode)
  if (checked != undefined) item.setChecked(checked)
  return item.append(
    $create(RichListItemTitleNode),
    $create(RichListItemBodyNode).append($createParagraphNode())
  )
}

// /** The list item holding the caret. */
// export const $getListItemAtCaret = () => {
//   const selection = $getSelection()
//   if (!$isRangeSelection(selection)) return null
//   return $findMatchingParent(selection.anchor.getNode(), $isListItemNode)
// }

// /** Plain item → rich item: its text becomes the title and the caret moves into an empty body. */
// export const $addDetails = (item: ListItemNode) => {
//   const rich = $createRichListItem(item.getChecked())
//   rich.getTitle()?.append(...item.getChildren())
//   item.replace(rich)
//   rich.getBody()?.selectStart()
// }

/** Rich item → plain item: the title becomes the item's text and non-empty body blocks move below it, splitting the list. */
export const $removeDetails = (item: RichListItemNode) => {
  const plain = $createListItemNode(item.getChecked()).append(
    ...(item.getTitle()?.getChildren() ?? [])
  )
  const blocks =
    item
      .getBody()
      ?.getChildren()
      .filter((ea) => !$isEmptyParagraph(ea)) ?? []

  item.replace(plain)
  blocks.reduce<LexicalNode>((prev, block) => prev.insertAfter(block), plain)
  plain.selectStart()
}

// /** Every rich item holds exactly a title then a body; stray inline nodes go to the title, stray blocks to the body. */
// export const $normalizeRichListItem = (item: RichListItemNode) => {
//   const title = item.getTitle() ?? $create(RichListItemTitleNode)
//   const body = item.getBody() ?? $create(RichListItemBodyNode)
//
//   for (const child of item.getChildren()) {
//     if (child.is(title) || child.is(body)) continue
//     if (child instanceof ElementNode && !child.isInline()) body.append(child)
//     else title.append(child)
//   }
//
//   const first = item.getFirstChild()
//   if (!first) item.append(title)
//   else if (!first.is(title)) first.insertBefore(title)
//   if (!body.is(title.getNextSibling())) title.insertAfter(body)
//   if (body.isEmpty()) body.append($createParagraphNode())
// }
