import {
  type SerializedListItemNode,
  ListItemNode,
} from '@payloadcms/richtext-lexical/lexical/list'

export type SerializedCheckmarkListItem = SerializedListItemNode

export class CheckmarkListItemNode extends ListItemNode {
  // matches the stored data, the site converter, and the CSS
  static getType = () => 'checkmark-list-item'

  static clone = (node: CheckmarkListItemNode): CheckmarkListItemNode =>
    new CheckmarkListItemNode(node.__value, node.__checked, node.__key)

  static importJSON = (serialized: SerializedCheckmarkListItem) => {
    return super.importJSON({ ...serialized, type: this.getType() })
  }

  constructor(value?: number, _checked?: boolean, key?: string) {
    super(value, true, key)
    return this
  }

  createDOM = (config: Parameters<ListItemNode['createDOM']>[0]): HTMLElement => {
    const el = super.createDOM(config)
    el.className =
      'checkmark-list-item LexicalEditorTheme__listItem LexicalEditorTheme__listItemUnchecked'
    return el
  }

  exportJSON = (): SerializedCheckmarkListItem => {
    return { ...super.exportJSON(), type: this.getType() }
  }
}

export const $createCheckmarkListItemNode = (): CheckmarkListItemNode =>
  new CheckmarkListItemNode(1)
