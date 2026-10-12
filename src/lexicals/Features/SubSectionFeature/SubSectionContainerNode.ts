import { subSectionHeadingStyle } from '@/lexicals/Features/_lib/nodeStates'
import { type StructureDOM, StructureContainerNode } from '@/lexicals/Features/Structure/nodes'
import { type LexicalNode, $create } from '@payloadcms/richtext-lexical/lexical'

export class SubSectionContainerNode extends StructureContainerNode {
  $config() {
    return this.config('subsection-container', {
      stateConfigs: [{ stateConfig: subSectionHeadingStyle, flat: true }],
    })
  }

  dom(): StructureDOM {
    return { tag: 'section', className: 'lexical__subsection', slot: 'subsection' }
  }

  headingStyleState() {
    return subSectionHeadingStyle
  }
}

export const $createSubSectionContainer = () => $create(SubSectionContainerNode)

export const $isSubSectionContainer = (
  node: Nullish<LexicalNode>
): node is SubSectionContainerNode => node instanceof SubSectionContainerNode
