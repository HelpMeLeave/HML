import {
  $createParagraphNode,
  type ElementNode,
  type LexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

/**
 * Remove `container`, ejecting its content-node children back into the parent
 * flow. If the content body is effectively empty, replace the container with a
 * single fresh paragraph; otherwise lift each child out (in order) after the
 * container before removing it. Places the cursor appropriately in both cases.
 */
export function $ejectContainerContents<T extends ElementNode>(
  container: ElementNode,
  isContent: (node: LexicalNode | null) => node is T
): void {
  const content = container.getLastChild()

  if (isContent(content)) {
    const children = content.getChildren()
    const effectivelyEmpty =
      children.length === 0 || (children.length === 1 && children[0].getTextContent() === '')

    if (effectivelyEmpty) {
      const p = $createParagraphNode()
      container.insertAfter(p)
      container.remove()
      p.select()
    } else {
      let insertPoint: LexicalNode = container
      for (const child of [...children]) {
        child.remove()
        insertPoint.insertAfter(child)
        insertPoint = child
      }
      container.remove()
      children[0].selectStart()
    }
  } else {
    const p = $createParagraphNode()
    container.insertAfter(p)
    container.remove()
    p.select()
  }
}
