import { type LexicalNode, $create, ElementNode } from '@payloadcms/richtext-lexical/lexical'

export class SubSectionContentNode extends ElementNode {
  $config() {
    return this.config('subsection-content', { extends: ElementNode })
  }

  createDOM() {
    const el = document.createElement('article')
    el.className = 'lexical__subsection-content'
    return el
  }

  updateDOM() {
    return false
  }

  isInline() {
    return false
  }

  isShadowRoot() {
    return true
  }
}

export const $createSubSectionContentNode = () => $create(SubSectionContentNode)
export const $isSubSectionContentNode = (
  node: LexicalNode | null | undefined
): node is SubSectionContentNode => node instanceof SubSectionContentNode
