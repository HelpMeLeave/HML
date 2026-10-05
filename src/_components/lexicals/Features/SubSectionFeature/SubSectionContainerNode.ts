import { type LexicalNode, $create, ElementNode } from '@payloadcms/richtext-lexical/lexical'

export class SubSectionContainerNode extends ElementNode {
  $config() {
    return this.config('subsection-container', { extends: ElementNode })
  }

  createDOM() {
    const el = document.createElement('section')
    el.className = 'lexical__subsection'
    return el
  }

  updateDOM() {
    return false
  }

  isInline() {
    return false
  }

  canBeEmpty() {
    return false
  }

  insertNewAfter() {
    return null
  }
}

export const $createSubSectionContainerNode = () => $create(SubSectionContainerNode)

export const $isSubSectionContainerNode = (
  node: LexicalNode | null | undefined
): node is SubSectionContainerNode => node instanceof SubSectionContainerNode
