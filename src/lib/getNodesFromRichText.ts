import type {
  SerializedElementNode,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

export const getNodesFromRichText = <T extends AnySafe>(
  baseNode: SerializedElementNode | undefined,
  filterFn: (node: SerializedLexicalNode) => boolean,
  processFn: (node: SerializedLexicalNode) => T
): T[] => {
  const returnedNodes: SerializedLexicalNode[] = []

  const checkChildren = (node: SerializedElementNode) => {
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        if (filterFn(child)) {
          returnedNodes.push(processFn(child) as AnySafe)
        } else {
          checkChildren(child as SerializedElementNode)
        }
      })
    }
  }

  baseNode && checkChildren(baseNode)
  return returnedNodes as T[]
}
