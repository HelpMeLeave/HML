import { $isDefinitionNode } from '@/_components/lexicals/Features/DefinitionsFeature/DefinitionNode'
import type { LexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { $isLinkNode } from '@payloadcms/richtext-lexical/lexical/link'

// A word already inside a link or an accepted definition is not a suggestion.
export const $isWrapper = (node: LexicalNode) => $isLinkNode(node) || $isDefinitionNode(node)
