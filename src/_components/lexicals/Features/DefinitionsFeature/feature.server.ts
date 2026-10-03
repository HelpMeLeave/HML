import { DefinitionNode } from '@/_components/lexicals/Features/DefinitionsFeature/DefinitionNode'
import { DefinitionNodeWrapper } from '@/_components/lexicals/Features/DefinitionsFeature/DefinitionNodeWrapper'
import { createServerFeature } from '@payloadcms/richtext-lexical'

export const DefinitionsFeature = createServerFeature({
  feature: {
    ClientFeature: '@/_components/lexicals/Features/DefinitionsFeature/feature.client',
    nodes: [{ node: DefinitionNode }, { node: DefinitionNodeWrapper }],
  },
  key: 'definitions',
})
