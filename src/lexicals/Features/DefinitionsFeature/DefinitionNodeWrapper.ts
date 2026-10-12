import { instanceState, termIDState } from '@/lexicals/Features/_lib/nodeStates'
import { $collectWrapperNodes } from '@/lexicals/Features/DefinitionsFeature/_lib/collectWrappers'
import {
  type LexicalNode,
  $create,
  $getState,
  $setState,
  ElementNode,
} from '@payloadcms/richtext-lexical/lexical'

export class DefinitionNodeWrapper extends ElementNode {
  $config() {
    return this.config('definition-wrapper', {
      extends: ElementNode,
      stateConfigs: [
        { stateConfig: termIDState, flat: true },
        { stateConfig: instanceState, flat: true },
      ],
    })
  }

  createDOM(): HTMLElement {
    const el = document.createElement('span')
    el.className = 'lexical__definition-wrapper'
    // 'direct' reads this node's own copy, which is what reconciliation is rendering
    el.dataset.termId = String($getState(this, termIDState, 'direct'))
    el.dataset.wrappedText = this.getFullTextContent()

    return el
  }

  getTermID() {
    return $getState(this, termIDState)
  }

  getInstance() {
    return $getState(this, instanceState)
  }

  isInline(): boolean {
    return true
  }

  updateDOM(): boolean {
    return false
  }

  getFullTextContent() {
    return this.getAllTextNodes()
      .map((child) => child.getTextContent())
      .join(' ')
  }

  empty() {
    for (const child of this.getChildren()) this.insertBefore(child)
  }
}

export const $createDefinitionNodeWrapper = (termID: number, instance: number) =>
  $setState($setState($create(DefinitionNodeWrapper), termIDState, termID), instanceState, instance)

export const $isDefinitionNodeWrapper = (
  node: Nullish<LexicalNode>
): node is DefinitionNodeWrapper => node instanceof DefinitionNodeWrapper

export const $purgeWrappers = (remove: boolean = true): number => {
  const wrappers = $collectWrapperNodes()

  for (const wrapper of wrappers) {
    wrapper.empty()
    remove && wrapper.remove()
  }

  return wrappers.length
}

export const $reject = (node: LexicalNode | null) => {
  if (!$isDefinitionNodeWrapper(node)) return
  node.empty()
}
