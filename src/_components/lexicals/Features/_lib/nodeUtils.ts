// Unused since the custom nodes moved to $config(): Lexical's own importJSON calls updateFromJSON, which also keeps NodeState, textFormat and textStyle (this helper dropped all three)
// import { type ElementNode, type SerializedElementNode } from '@payloadcms/richtext-lexical/lexical'
//
// /** Apply format/indent/direction from a serialized node onto a freshly created node. */
// export function applySerializedProps<T extends ElementNode>(
//   node: T,
//   serialized: SerializedElementNode
// ): T {
//   node.setFormat(serialized.format)
//   node.setIndent(serialized.indent)
//   node.setDirection(serialized.direction)
//   return node
// }
export {}
