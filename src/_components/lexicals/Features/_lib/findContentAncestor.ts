import { SectionContentNode } from '@/_components/lexicals/Features/SectionFeature/SectionStructureNodes'
import { SubSectionContentNode } from '@/_components/lexicals/Features/SubSectionFeature/SubSectionContentNode'
import { type LexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { $getNearestNodeOfType } from '@payloadcms/richtext-lexical/lexical/utils'

export const $findContentAncestor = <T extends SectionContentNode | SubSectionContentNode>(
  start: LexicalNode,
  klass: Parameters<typeof $getNearestNodeOfType>[1]
): null | {
  contentNode: T
  directChild: LexicalNode
} => {
  const parent = $getNearestNodeOfType(start, klass)
  // getNodesBetween()[0] is always the content node itself, not its child
  if (!parent || parent === start) return null

  // climb from the cursor until the next step up is the content node
  let directChild = start
  while (directChild.getParent() !== parent) {
    const up = directChild.getParent()
    if (!up) return null
    directChild = up
  }

  return { contentNode: parent as T, directChild }
}
