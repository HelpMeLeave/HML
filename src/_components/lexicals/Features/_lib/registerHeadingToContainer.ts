import {
  type ElementNode,
  type LexicalEditor,
  type LexicalNode,
  TextNode,
} from '@payloadcms/richtext-lexical/lexical'
import { HeadingNode } from '@payloadcms/richtext-lexical/lexical/rich-text'

/**
 * Turn a loose core heading of `tag` into a full container, pulling the blocks that follow it (up to the next container or same-tag heading) into the container's body.
 *
 * Shared by Section (h2) and SubSection (h3). Core headings only arrive by paste, since the heading sizes are disabled in the toolbar.
 */
export const registerHeadingToContainer = (
  editor: LexicalEditor,
  {
    tag,
    skipParent,
    isContainer,
    build,
  }: {
    tag: 'h2' | 'h3'
    /** Parents a heading is already structural inside of. */
    skipParent: (parent: ElementNode) => boolean
    isContainer: (node: LexicalNode | null) => boolean
    build: (headingChildren: LexicalNode[]) => { container: ElementNode; body: ElementNode }
  }
) =>
  editor.registerNodeTransform(HeadingNode, (node) => {
    if (node.getTag() !== tag) return
    const parent = node.getParent()
    if (!parent) return
    if (skipParent(parent)) return

    const bodyNodes: LexicalNode[] = []
    let sibling = node.getNextSibling()
    while (sibling) {
      if (isContainer(sibling)) break
      if (sibling instanceof HeadingNode && sibling.getTag() === tag) break
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
