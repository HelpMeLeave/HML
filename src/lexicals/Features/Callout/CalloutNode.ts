import { calloutType } from '@/lexicals/Features/_lib/nodeStates'
import { getCalloutData, type CALLOUT_KEYS } from '@/lexicals/Features/Callout/CALLOUTS'
import { cn } from '@/lib/cn'
import {
  $create,
  $getState,
  $getStateChange,
  $setState,
  ElementNode,
} from '@payloadcms/richtext-lexical/lexical'

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
    const calloutKey = $getState(this, calloutType) as CALLOUT_KEYS
    const calloutData = getCalloutData(calloutKey)
    el.style = `--label:"${calloutData.label}"`

    el.className = cn(
      'callout',
      'LexicalEditorTheme__callout before:[content:var(--label)]',
      calloutData.className
    )
    el.dataset.slot = 'callout'
    el.dataset.variant = $getState(this, calloutType)
    return el
  }

  isInline(): boolean {
    return false
  }

  updateDOM(prevNode: this, dom: HTMLElement): boolean {
    const change = $getStateChange(this, prevNode, calloutType)
    if (change) dom.dataset.variant = change[0]
    return false
  }
}

export const $isCallout = (node: unknown): node is CalloutNode => node instanceof CalloutNode
export const $createCallout = (type?: CalloutType) => {
  const callout = $create(CalloutNode)
  if (type) $setCalloutType(callout, type)
  return callout
}

export type CalloutType = 'tip' | 'quote' | 'urgent' | 'note' | 'case-study'
export const $setCalloutType = (node: CalloutNode, type: CalloutType = 'note') =>
  $setState(node, calloutType, type)
