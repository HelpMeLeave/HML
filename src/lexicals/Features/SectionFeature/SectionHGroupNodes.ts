import { browClassname } from '@/components/Structure/Eyebrow'
import { headingIdState } from '@/lexicals/Features/_lib/nodeStates'
import {
  type StructureDOM,
  StructureHeadingNode,
  StructureNode,
} from '@/lexicals/Features/Structure/nodes'
import { cn } from '@/lib/cn'
import { type LexicalNode, $create } from '@payloadcms/richtext-lexical/lexical'

export class SectionHGroupNode extends StructureNode {
  $config() {
    return this.config('section-hgroup', {})
  }

  dom(): StructureDOM {
    return {
      tag: 'hgroup',
      className:
        'text-6xl leading-none m-0 *:slot-eyebrow:leading-normal data-cover:mb-8 data-cover:txt-4 data-cover:md:txt-7xl data-cover:max-[899px]:mt-12 data-cover:min-[900px]:sidebar-open:mt-12',
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
      className:
        'not-in-data-cover:text-[1em] not-in-data-cover:text-body in-data-cover:px-1 in-data-cover:pt-2.5 in-data-cover:pb-0 in-data-cover:font-normal in-data-cover:leading-header',
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
    return {
      tag: 'p',
      className: cn(
        browClassname,
        'node-empty:opacity-75',
        'in-data-cover:px-3 in-data-cover:py-0 in-data-cover:txt-em-0.25 in-data-cover:leading-snug in-data-cover:font-normal in-data-cover:tracking-normal'
      ),
      placeholder: 'Eyebrow...',
      slot: 'eyebrow',
    }
  }
}

export class SectionSubtitleNode extends StructureHeadingNode {
  $config() {
    return this.config('section-subtitle', {})
  }

  dom(): StructureDOM {
    return {
      tag: 'p',
      // className: 'hgroup__subtitle',
      className:
        'hgroup__subtitle subtitle-text node-empty:data-placeholder-noitalic/75 node-empty:leading-normal in-data-cover:mt-2 in-data-cover:mb-0 in-data-cover:px-4 in-data-cover:text-center in-data-cover:text-[0.9rem] in-data-cover:leading-normal',
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
