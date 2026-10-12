import {
  type ElementNode,
  type LexicalEditor,
  type LexicalNode,
  TextNode,
} from '@payloadcms/richtext-lexical/lexical'
import { HeadingNode } from '@payloadcms/richtext-lexical/lexical/rich-text'

type RegisterHeadingToContainerFnProps = {
  tag: 'h2' | 'h3'
  /** Parents a heading is already structural inside of. */
  skipParent: (parent: ElementNode) => boolean
  isContainer: (node: LexicalNode | null) => boolean
  build: (headingChildren: LexicalNode[]) => {
    container: ElementNode
    body: ElementNode
  }
}

export const registerHeadingToContainer = (
  editor: LexicalEditor,
  { tag, skipParent, isContainer, build }: RegisterHeadingToContainerFnProps
) =>
  editor.registerNodeTransform(HeadingNode, (node) => {
    if (node.getTag() != tag) return
    const parent = node.getParent()
    if (!parent || skipParent(parent)) return

    const bodyNodes: LexicalNode[] = []
    let sibling = node.getNextSibling()

    while (sibling) {
      if (isContainer(sibling) || (sibling instanceof HeadingNode && sibling.getTag() === tag))
        break
      bodyNodes.push(sibling)
      sibling = sibling.getNextSibling()
    }

    node.getChildren().forEach((child) => {
      if (child instanceof TextNode) child.setFormat(0)
    })

    const { container, body } = build(node.getChildren())

    if (bodyNodes.length > 0) {
      body.getFirstChild()?.remove()
      bodyNodes.forEach((n) => {
        n.remove()
        body.append(n)
      })
    }

    node.replace(container)
  })
