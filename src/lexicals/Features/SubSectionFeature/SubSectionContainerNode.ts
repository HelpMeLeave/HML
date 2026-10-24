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
    // return { tag: 'section', className: 'lexical__subsection', slot: 'subsection' }
    return {
      tag: 'section',
      // className: 'lexical__subsection border-l border-ui-200 pl-4',
      className:
        'lexical__subsection border-l border-ui-200 pl-4 data-[variant=section]:[&>h3]:text-6xl data-[variant=section]:[&>h3]:leading-none data-[variant=minor]:[&>h3]:mt-[1em] data-[variant=minor]:[&>h3]:text-[1.25rem] data-[variant=minor]:[&>h3]:*:font-extrabold',
      slot: 'subsection',
    }
  }

  headingStyleState() {
    return subSectionHeadingStyle
  }
}

export const $createSubSectionContainer = () => $create(SubSectionContainerNode)

export const $isSubSectionContainer = (
  node: Nullish<LexicalNode>
): node is SubSectionContainerNode => node instanceof SubSectionContainerNode
