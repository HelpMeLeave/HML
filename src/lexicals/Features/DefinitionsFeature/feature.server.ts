import { DefinitionNode } from '@/lexicals/Features/DefinitionsFeature/DefinitionNode'
import { DefinitionNodeWrapper } from '@/lexicals/Features/DefinitionsFeature/DefinitionNodeWrapper'
import { createServerFeature } from '@payloadcms/richtext-lexical'

export const DefinitionsFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/DefinitionsFeature/feature.client',
    nodes: [{ node: DefinitionNode }, { node: DefinitionNodeWrapper }],
  },
  key: 'definitions',
})
