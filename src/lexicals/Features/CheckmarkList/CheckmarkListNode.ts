import { type EditorConfig } from '@payloadcms/richtext-lexical/lexical'
import { type SerializedListNode, ListNode } from '@payloadcms/richtext-lexical/lexical/list'

export class CheckmarkListNode extends ListNode {
  $config() {
    return this.config('checkmark-list', { extends: ListNode })
  }

  constructor(start: number = 1, key?: string) {
    super('check', start, key)
  }

  createDOM(config: EditorConfig): HTMLElement {
    const el = super.createDOM(config)
    el.className = 'checkmark-list LexicalEditorTheme__ul LexicalEditorTheme__checklist'
    return el
  }

  exportJSON(): SerializedListNode {
    return { ...super.exportJSON(), listType: 'check' }
  }
}
