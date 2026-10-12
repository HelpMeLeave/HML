import {
  $create,
  // $findMatchingParent,
  // $getSelection,
  $getState,
  $getStateChange,
  // $isRangeSelection,
  $setState,
  ElementNode,
} from '@payloadcms/richtext-lexical/lexical'
import { calloutType } from '../_lib/nodeStates'

export class CalloutNode extends ElementNode {
  $config() {
    return this.config('callout', {
      extends: ElementNode,
      stateConfigs: [{ stateConfig: calloutType, flat: true }],
    })
  }

  constructor() {
    super()
  }

  createDOM() {
    const el = document.createElement('article')
    el.className = 'LexicalEditorTheme__callout'
    el.dataset.type = $getState(this, calloutType)
    return el
  }

  isInline(): boolean {
    return false
  }

  updateDOM(prevNode: this, dom: HTMLElement): boolean {
    const change = $getStateChange(this, prevNode, calloutType)
    if (change) dom.dataset.type = change[0]
    return false
  }
}

export const $isCallout = (node: unknown): node is CalloutNode => node instanceof CalloutNode
export const $createCallout = () => $create(CalloutNode)

export type CalloutType = 'tip' | 'quote' | 'urgent' | 'note'
export const $setCalloutType = (node: CalloutNode, type: CalloutType) =>
  $setState(node, calloutType, type)

// /** Callout at the caret position */
// export const $getCalloutAtCaret = () => {
//   const selection = $getSelection()
//   if (!$isRangeSelection(selection)) return null
//
//   return $findMatchingParent(selection.anchor.getNode(), $isCallout)
// }
