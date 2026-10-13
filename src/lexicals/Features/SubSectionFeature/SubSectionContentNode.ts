import { type StructureDOM, StructureContentNode } from '@/lexicals/Features/Structure/nodes'
import { type LexicalNode, $create } from '@payloadcms/richtext-lexical/lexical'

export class SubSectionContentNode extends StructureContentNode {
  $config() {
    return this.config('subsection-content', {})
  }

  dom(): StructureDOM {
    return { tag: 'article', className: 'lexical__subsection-content', slot: 'content' }
  }
}

export const $createSubSectionContentNode = () => $create(SubSectionContentNode)

export const $isSubSectionContentNode = (
  node: Nullish<LexicalNode>
): node is SubSectionContentNode => node instanceof SubSectionContentNode
