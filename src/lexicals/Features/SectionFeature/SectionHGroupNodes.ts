import { browClassname } from '@/components/Structure/Eyebrow'
import { headingIdState } from '@/lexicals/Features/_lib/nodeStates'
import {
  type StructureDOM,
  StructureHeadingNode,
  StructureNode,
} from '@/lexicals/Features/Structure/nodes'
import { type LexicalNode, $create } from '@payloadcms/richtext-lexical/lexical'

export class SectionHGroupNode extends StructureNode {
  $config() {
    return this.config('section-hgroup', {})
  }

  dom(): StructureDOM {
    return {
      tag: 'hgroup',
      className: 'text-6xl leading-none m-0 *:slot-eyebrow:leading-normal',
      slot: 'header',
    }
  }

  canBeEmpty() {
    return false
  }

  insertNewAfter() {
    return null
  }
}

export class SectionHeadingNode extends StructureHeadingNode {
  $config() {
    return this.config('section-heading', {
      stateConfigs: [{ stateConfig: headingIdState, flat: true }],
    })
  }

  dom(): StructureDOM {
    return {
      tag: 'h2',
      className: 'text-[1em] text-body',
      placeholder: 'Section Heading....',
      slot: 'heading',
    }
  }
}

export class SectionEyebrowNode extends StructureHeadingNode {
  $config() {
    return this.config('section-eyebrow', {})
  }

  dom(): StructureDOM {
    return { tag: 'p', className: browClassname, placeholder: 'Eyebrow...', slot: 'eyebrow' }
  }
}

export class SectionSubtitleNode extends StructureHeadingNode {
  $config() {
    return this.config('section-subtitle', {})
  }

  dom(): StructureDOM {
    return {
      tag: 'p',
      className: 'hgroup__subtitle',
      placeholder: 'Subtitle...',
      slot: 'subtitle',
    }
  }
}

export const $isSectionHGroupNode = (node?: LexicalNode | null): node is SectionHGroupNode =>
  node instanceof SectionHGroupNode

export const $createSectionHGroupNode = () => $create(SectionHGroupNode)
export const $createSectionHeadingNode = () => $create(SectionHeadingNode)
export const $createSectionEyebrowNode = () => $create(SectionEyebrowNode)
export const $createSectionSubtitleNode = () => $create(SectionSubtitleNode)
