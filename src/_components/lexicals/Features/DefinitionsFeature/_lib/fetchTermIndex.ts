import { buildTermIndex } from '@/_components/lexicals/Features/DefinitionsFeature/_lib/buildTermIndex'
import type { TermIndex } from '@/_components/lexicals/Features/DefinitionsFeature/_types'

import type { GlossaryTerm } from '@/payload-types'
import { sdk } from '@/server/sdk'

export const fetchTermIndex = async (skippedIds: number[]): Promise<TermIndex> => {
  // select narrows the payload: definitions are rich text and would dwarf the rest.
  const { docs: terms } = await sdk.find({
    collection: 'glossary-term',
    where: { id: { not_in: skippedIds ?? [] } },
    select: {
      abbreviation: true,
      alias: true,
      term: true,
    },
    depth: 0,
    pagination: false,
  })

  return buildTermIndex(terms as GlossaryTerm[])
}
