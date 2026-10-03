import { type ElementNode, type SerializedElementNode } from '@payloadcms/richtext-lexical/lexical'

/** Apply format/indent/direction from a serialized node onto a freshly created node. */
export function applySerializedProps<T extends ElementNode>(
  node: T,
  serialized: SerializedElementNode
): T {
  node.setFormat(serialized.format)
  node.setIndent(serialized.indent)
  node.setDirection(serialized.direction)
  return node
}
