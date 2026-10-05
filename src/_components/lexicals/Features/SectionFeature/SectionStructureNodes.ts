import { type LexicalNode, $create, ElementNode } from '@payloadcms/richtext-lexical/lexical'

export class SectionContainerNode extends ElementNode {
  $config() {
    return this.config('section-container', { extends: ElementNode })
  }

  createDOM() {
    const el = document.createElement('section')
    el.className = 'lexical__section border-l border-ui-200'
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

export class SectionContentNode extends ElementNode {
  $config() {
    return this.config('section-content', { extends: ElementNode })
  }

  createDOM() {
    const el = document.createElement('article')
    el.className = 'lexical__section-content'
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

export const $createSectionContainerNode = () => $create(SectionContainerNode)
export const $isSectionContainerNode = (
  node: LexicalNode | null | undefined
): node is SectionContainerNode => node instanceof SectionContainerNode

export const $createSectionContentNode = () => $create(SectionContentNode)
export const $isSectionContentNode = (
  node: LexicalNode | null | undefined
): node is SectionContentNode => node instanceof SectionContentNode
