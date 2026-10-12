import { termIDState } from '@/lexicals/Features/_lib/nodeStates'
import {
  type LexicalNode,
  type SerializedElementNode,
  type Spread,
  $create,
  $getState,
  $setState,
  ElementNode,
} from '@payloadcms/richtext-lexical/lexical'

export type SerializedDefinitionNode = Spread<{ termID: number }, SerializedElementNode>

export class DefinitionNode extends ElementNode {
  $config() {
    return this.config('definition', {
      extends: ElementNode,
      stateConfigs: [{ stateConfig: termIDState, flat: true }],
    })
  }

  createDOM(): HTMLElement {
    const el = document.createElement('span')
    el.className = 'lexical__definition'
    el.dataset.termId = String($getState(this, termIDState, 'direct'))
    return el
  }

  getTermID(): number {
    return $getState(this, termIDState)
  }

  isInline() {
    return true
  }

  updateDOM() {
    return false
  }
}

export const $createDefinitionNode = (termID: number) =>
  $setState($create(DefinitionNode), termIDState, termID)

export const $isDefinitionNode = (node: Nullish<LexicalNode>): node is DefinitionNode =>
  node instanceof DefinitionNode
