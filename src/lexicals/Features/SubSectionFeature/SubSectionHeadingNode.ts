import { headingIdState } from '@/lexicals/Features/_lib/nodeStates'
import { type StructureDOM, StructureHeadingNode } from '@/lexicals/Features/Structure/nodes'
import { $create } from '@payloadcms/richtext-lexical/lexical'

export class SubSectionHeadingNode extends StructureHeadingNode {
  $config() {
    return this.config('subsection-heading', {
      stateConfigs: [{ stateConfig: headingIdState, flat: true }],
    })
  }

  dom(): StructureDOM {
    return {
      tag: 'h3',
      className: 'lexical__subsection-heading',
      placeholder: 'Subsection heading...',
    }
  }

  markdownHeading() {
    return `### ${this.getTextContent()}`
  }
}

export const $createSubSectionHeadingNode = () => $create(SubSectionHeadingNode)
