import { headingIdState } from '@/_components/lexicals/Features/_lib/nodeStates'
import { $create, $createParagraphNode, ElementNode } from '@payloadcms/richtext-lexical/lexical'

export class H4Node extends ElementNode {
  $config() {
    return this.config('h4', {
      extends: ElementNode,
      stateConfigs: [{ stateConfig: headingIdState, flat: true }],
    })
  }

  createDOM() {
    const el = document.createElement('h4')
    el.className = 'lexical__h4'
    return el
  }

  updateDOM() {
    return false
  }

  isInline() {
    return false
  }

  insertNewAfter() {
    const paragraph = $createParagraphNode()
    this.insertAfter(paragraph)
    return paragraph
  }
}

export const $createH4Node = () => $create(H4Node)
