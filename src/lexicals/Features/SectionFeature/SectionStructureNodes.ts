import { sectionHeadingStyle } from '@/lexicals/Features/_lib/nodeStates'
import {
  type StructureDOM,
  StructureContainerNode,
  StructureContentNode,
} from '@/lexicals/Features/Structure/nodes'
import { type LexicalNode, $create } from '@payloadcms/richtext-lexical/lexical'

export class SectionContainerNode extends StructureContainerNode {
  $config() {
    return this.config('section-container', {
      stateConfigs: [{ stateConfig: sectionHeadingStyle, flat: true }],
    })
  }

  dom(): StructureDOM {
    return { tag: 'section', className: 'lexical__section border-l border-ui-200', slot: 'section' }
  }

  headingStyleState() {
    return sectionHeadingStyle
  }
}

export class SectionContentNode extends StructureContentNode {
  $config() {
    return this.config('section-content', {})
  }

  dom(): StructureDOM {
    return { tag: 'article', className: 'lexical__section-content', slot: 'content' }
  }
}

export const $createSectionContainer = () => $create(SectionContainerNode)

export const $isSectionContainer = (node: Nullish<LexicalNode>): node is SectionContainerNode =>
  node instanceof SectionContainerNode

export const $createSectionContent = () => $create(SectionContentNode)

export const $isSectionContent = (node: Nullish<LexicalNode>): node is SectionContentNode =>
  node instanceof SectionContentNode
