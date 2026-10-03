import { buildMatcher } from '@/_components/lexicals/Features/DefinitionsFeature/_lib/buildMatcher'
import type { TermIndex } from '@/_components/lexicals/Features/DefinitionsFeature/_types'
import type { GlossaryTerm } from '@/payload-types'

export const buildTermIndex = (docs: GlossaryTerm[]): TermIndex => {
  const byExact = new Map<string, number>()
  const byLower = new Map<string, number>()

  for (const doc of docs) {
    for (const value of [doc.term, ...(doc.alias ?? [])]) {
      const key = value?.trim().toLowerCase()
      if (key && !byLower.has(key)) byLower.set(key, doc.id)
    }
    const abbreviation = doc.abbreviation?.trim()
    if (abbreviation && !byExact.has(abbreviation)) byExact.set(abbreviation, doc.id)
  }

  return {
    byExact,
    byLower,
    insensitive: buildMatcher([...byLower.keys()], 'gi'),
    sensitive: buildMatcher([...byExact.keys()], 'g'),
  }
}
