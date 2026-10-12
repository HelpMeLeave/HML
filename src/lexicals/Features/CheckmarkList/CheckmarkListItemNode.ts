import { type EditorConfig } from '@payloadcms/richtext-lexical/lexical'
import {
  type SerializedListItemNode,
  ListItemNode,
} from '@payloadcms/richtext-lexical/lexical/list'

export type SerializedCheckmarkListItem = SerializedListItemNode

export class CheckmarkListItemNode extends ListItemNode {
  // the type matches the stored data, the site converter, and the CSS
  $config() {
    return this.config('checkmark-list-item', { extends: ListItemNode })
  }

  constructor(value: number = 1, _checked?: boolean, key?: string) {
    super(value, true, key)
  }

  createDOM(config: EditorConfig): HTMLElement {
    const el = super.createDOM(config)
    el.className =
      'checkmark-list-item LexicalEditorTheme__listItem LexicalEditorTheme__listItemUnchecked'
    return el
  }
}
