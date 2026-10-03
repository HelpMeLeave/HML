import type { DefinitionMatch } from '@/_components/lexicals/Features/DefinitionsFeature/_types'
import {
  type DefinitionNodeWrapper,
  $isDefinitionNodeWrapper,
} from '@/_components/lexicals/Features/DefinitionsFeature/DefinitionNodeWrapper'
import { $dfs } from '@payloadcms/richtext-lexical/lexical/utils'

// Document order. Wrappers only hold text, so none can sit inside another.
export const $collectWrapperNodes = (): DefinitionNodeWrapper[] =>
  $dfs()
    .map(({ node }) => node)
    .filter($isDefinitionNodeWrapper)

export const $collectWrapperMarks = (): DefinitionMatch[] =>
  $collectWrapperNodes().map((wrapper) => {
    const text = wrapper.getTextContent()
    return {
      end: text.length,
      nodeKey: wrapper.getKey(),
      start: 0,
      termID: wrapper.getTermID(),
      text,
      instance: wrapper.__instance,
    }
  })
