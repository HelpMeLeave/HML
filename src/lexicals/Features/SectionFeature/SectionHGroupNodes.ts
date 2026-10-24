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
      // className: 'text-6xl leading-none m-0 *:slot-eyebrow:leading-normal',
      className: [
        'text-6xl leading-none m-0 *:slot-eyebrow:leading-normal',
        'cover:isolate cover:mb-8 cover:grid cover:gap-0 cover:p-0 cover:txt-4 cover:[--cover-pad:0.25em] cover:[container-type:inline-size] cover:max-[899px]:mt-12 cover:md:txt-7xl cover:min-[900px]:sidebar-open:mt-12',
        'cover:grid-cols-[[cover-start]_var(--cover-pad)_[text-start]_minmax(0,1fr)_[text-end]_var(--cover-pad)_[cover-end]]',
        'cover:grid-rows-[[cover-start]_1fr_[heading]_auto_[eyebrow]_auto_var(--cover-pad)_[cover-end_subtitle]_auto]',
        'has-[>.lexical-upload[data-position*=top]]:grid-rows-[[cover-start]_var(--cover-pad)_[heading]_auto_[eyebrow]_auto_1fr_[cover-end_subtitle]_auto]!',
        'has-[>.lexical-upload[data-position*=middle]]:grid-rows-[[cover-start]_1fr_[heading]_auto_[eyebrow]_auto_1fr_[cover-end_subtitle]_auto]!',
        'cover-image:pointer-events-none cover-image:relative cover-image:col-[cover] cover-image:row-[cover] cover-image:m-0 cover-image:min-h-[min(40vh,32rem)] cover-image:w-auto cover-image:rounded-xl cover-image:border-0 cover-image:shadow-md',
        String.raw`cover-image:[&_:is([class*=\_\_contents],[class*=\_\_card],[class*=\_\_media])]:h-full cover-image:[&_:is([class*=\_\_contents],[class*=\_\_card],[class*=\_\_media])]:shadow-none`,
        'cover-image:[&_img]:absolute cover-image:[&_img]:inset-0 cover-image:[&_img]:-z-1 cover-image:[&_img]:size-full cover-image:[&_img]:max-h-none cover-image:[&_img]:min-h-0 cover-image:[&_img]:max-w-none cover-image:[&_img]:min-w-0 cover-image:[&_img]:rounded-xl cover-image:[&_img]:object-cover',
        String.raw`cover-image:[&_:is([class*=\_\_swap-drawer-toggler],[class*=\_\_metaOverlay])]:hidden`,
        String.raw`cover-image:[&_[class*=\_\_overlay]]:pointer-events-auto cover-image:[&_[class*=\_\_overlay]]:z-1 cover-image:[&_[class*=\_\_overlay]]:transform-none cover-image:[&_[class*=\_\_overlay]]:opacity-100`,
      ].join(' '),
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
      // className: 'text-[1em] text-body',
      className: [
        'text-[1em] text-body',
        'in-cover:z-1 in-cover:col-[text] in-cover:m-0 in-cover:w-fit in-cover:justify-self-start in-cover:bg-(--chip-bg,transparent) in-cover:py-[0.15em] in-cover:font-normal in-cover:whitespace-nowrap in-cover:text-(--chip-text,inherit) in-[:has(>.lexical-upload[data-position*=center])]:justify-self-center! in-[:has(>.lexical-upload[data-position*=right])]:justify-self-end!',
        'in-cover:row-[heading] in-cover:px-1 in-cover:pt-2.5 in-cover:pb-0 in-cover:leading-header in-cover:[font-size:min(1em,calc((100cqi-3rem)/(var(--chars,20)*0.35)))]',
      ].join(' '),
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
        'node-empty-content:[content:"Eyebrow..."] node-empty:opacity-75',
        'in-cover:z-1 in-cover:col-[text] in-cover:m-0 in-cover:w-fit in-cover:justify-self-start in-cover:bg-(--chip-bg,transparent) in-cover:py-[0.15em] in-cover:font-normal in-cover:whitespace-nowrap in-cover:text-(--chip-text,inherit) in-[:has(>.lexical-upload[data-position*=center])]:justify-self-center! in-[:has(>.lexical-upload[data-position*=right])]:justify-self-end!',
        'in-cover:txt-em-0.25 in-cover:row-[eyebrow] in-cover:px-3 in-cover:py-0 in-cover:leading-snug in-cover:tracking-normal'
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
        'hgroup__subtitle subtitle-text node-empty:data-placeholder-noitalic/75 node-empty:leading-normal in-cover:col-[cover] in-cover:row-[subtitle] in-cover:mt-2 in-cover:mb-0 in-cover:px-4 in-cover:text-center in-cover:text-[0.9rem] in-cover:leading-normal',
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
