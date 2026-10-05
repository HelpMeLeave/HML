import { headingIdState } from '@/_components/lexicals/Features/_lib/nodeStates'
import { browClassname } from '@/components/Structure/Eyebrow'
import { type LexicalNode, $create, ElementNode } from '@payloadcms/richtext-lexical/lexical'

// $config() lets Lexical supply getType, clone, importJSON and exportJSON, so each node only says what's different about it

export class SectionHGroupNode extends ElementNode {
  $config() {
    return this.config('section-hgroup', { extends: ElementNode })
  }

  createDOM() {
    const el = document.createElement('hgroup')
    el.className = 'text-6xl leading-none m-0 *:data-[slot="brow"]:leading-normal'
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

export class SectionHeadingNode extends ElementNode {
  $config() {
    return this.config('section-heading', {
      extends: ElementNode,
      stateConfigs: [{ stateConfig: headingIdState, flat: true }],
    })
  }

  createDOM() {
    const el = document.createElement('h2')
    el.className = 'text-[1em] text-body'
    el.dataset.placeholder = 'Section Heading....'
    el.dataset.slot = 'heading'
    return el
  }

  updateDOM() {
    return false
  }

  isInline() {
    return false
  }
}

export class SectionEyebrowNode extends ElementNode {
  $config() {
    return this.config('section-eyebrow', { extends: ElementNode })
  }

  createDOM() {
    const el = document.createElement('p')
    el.className = browClassname
    el.dataset.placeholder = 'Eyebrow...'
    el.dataset.slot = 'brow'
    return el
  }

  updateDOM() {
    return false
  }

  isInline() {
    return false
  }

  insertNewAfter() {
    return null
  }
}

export class SectionSubtitleNode extends ElementNode {
  $config() {
    return this.config('section-subtitle', { extends: ElementNode })
  }

  createDOM() {
    const el = document.createElement('p')
    el.className = 'hgroup__subtitle'
    el.dataset.placeholder = 'Subtitle...'
    el.dataset.slot = 'subtitle'
    return el
  }

  updateDOM() {
    return false
  }

  isInline() {
    return false
  }

  insertNewAfter() {
    return null
  }
}

export const $isSectionHGroupNode = (node?: LexicalNode | null): node is SectionHGroupNode =>
  node instanceof SectionHGroupNode

export const $createSectionHGroupNode = () => $create(SectionHGroupNode)
export const $createSectionHeadingNode = () => $create(SectionHeadingNode)
export const $createSectionEyebrowNode = () => $create(SectionEyebrowNode)
export const $createSectionSubtitleNode = () => $create(SectionSubtitleNode)
