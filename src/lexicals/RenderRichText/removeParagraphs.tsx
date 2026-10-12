import type { SerializedElementNode } from '@payloadcms/richtext-lexical/lexical'
import type { JSXConverter } from '@payloadcms/richtext-lexical/react'

export const removeParagraph: JSXConverter<SerializedElementNode> = ({ node, nodesToJSX }) => (
  <>{nodesToJSX({ nodes: node.children })}</>
)
