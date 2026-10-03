import type { SerializedDefinitionNode } from '@/_components/lexicals/Features/DefinitionsFeature/DefinitionNode'
import type { JSXConverterArgs, JSXConverters } from '@payloadcms/richtext-lexical/react'

// Passthrough for now: the term id is the hook the front-end tooltip will attach to. No href — glossary-term has no slug and the glossary page does not exist yet.
export const definitionConverters: JSXConverters<SerializedDefinitionNode> = {
  // The explicit arg annotation is load-bearing: SerializedDefinitionNode's `type` field is a plain string, so the library's mapped-type branch and its catch-all index signature both apply to this key at once. TS can't derive parameter types from that intersection of function types and silently falls back to implicit any without this annotation.
  definition: ({ node, nodesToJSX }: JSXConverterArgs<SerializedDefinitionNode>) => {
    return <span data-term-id={node.termID}>{nodesToJSX({ nodes: node.children })}</span>
  },
}
