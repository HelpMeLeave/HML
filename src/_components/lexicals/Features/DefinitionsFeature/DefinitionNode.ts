import { termIDState } from '@/_components/lexicals/Features/_lib/nodeStates'
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
    // 'direct' reads this node's own copy, which is what reconciliation is rendering
    el.dataset.termId = String($getState(this, termIDState, 'direct'))
    return el
  }

  getTermID(): number {
    return $getState<string, unknown>(this, termIDState) as number
  }

  isInline(): boolean {
    return true
  }

  updateDOM(): boolean {
    return false
  }
}

export const $createDefinitionNode = (termID: number) =>
  $setState($create(DefinitionNode), termIDState, termID)

export const $isDefinitionNode = (node: LexicalNode | null | undefined): node is DefinitionNode =>
  node instanceof DefinitionNode
