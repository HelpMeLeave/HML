import { $isWrapper } from '@/_components/lexicals/Features/DefinitionsFeature/_lib/isWrapper'
import type {
  DefinitionMatch,
  MatchHit,
  TermIndex,
} from '@/_components/lexicals/Features/DefinitionsFeature/_types'
import { $getRoot } from '@payloadcms/richtext-lexical/lexical'
import { $findMatchingParent } from '@payloadcms/richtext-lexical/lexical/utils'

const runMatcher = (
  text: string,
  matcher: false | RegExp,
  lookup: (value: string) => number | undefined,
  instance: number
): MatchHit[] => {
  if (matcher == false) return []
  const hits: MatchHit[] = []
  // The matchers are reused across nodes and carry the `g` flag, so lastIndex has to be reset per string.
  matcher.lastIndex = 0
  let match: null | RegExpExecArray
  while ((match = matcher.exec(text)) !== null) {
    const value = match[0]
    const termID = lookup(value)
    if (termID !== undefined)
      hits.push({
        end: match.index + value.length,
        start: match.index,
        termID,
        text: value,
        instance: instance,
      })
  }
  return hits
}

const findHits = (text: string, index: TermIndex, instance: number): MatchHit[] => {
  // Insensitive hits are concatenated before sensitive ones, and the sort below
  // is stable, so when both matchers land on the exact same span the case-folded
  // hit is the one that survives.
  const all = [
    ...runMatcher(
      text,
      index.insensitive,
      (value) => index.byLower.get(value.toLowerCase()),
      instance
    ),
    ...runMatcher(text, index.sensitive, (value) => index.byExact.get(value), instance),
  ].sort((a, b) => a.start - b.start || b.end - a.end)

  // Two matchers can hit overlapping spans; the earlier and longer one wins.
  const kept: MatchHit[] = []
  for (const hit of all) {
    const previous = kept.at(-1)
    if (previous && hit.start < previous.end) continue
    kept.push(hit)
  }
  return kept
}

/** Must be called inside an editor read. Returns the first non-rejected occurrence of each term. */
// `skips` is per term: how many leading occurrences were rejected this session
export const $scanForTerms = (index: TermIndex, skips: Map<number, number>): DefinitionMatch[] => {
  const nodes = $getRoot()
    .getAllTextNodes()
    .filter((node) => !$findMatchingParent(node, $isWrapper))
  const matches: DefinitionMatch[] = []
  const seenMap = new Map<string, number>()

  for (const node of nodes) {
    // instance is set per term at push, so the hit's own value is a placeholder
    for (const hit of findHits(node.getTextContent(), index, 0)) {
      // First occurrence per document: define on first use, then leave the prose alone.
      const thisKey = String(hit.termID)

      !seenMap.has(thisKey) ?
        seenMap.set(thisKey, 0)
      : seenMap.set(thisKey, (seenMap.get(thisKey) ?? 0) + 1)

      const instance = skips.get(hit.termID) ?? 0
      if (seenMap.get(thisKey) == instance) {
        matches.push({ ...hit, nodeKey: node.getKey(), instance })
      }
    }
  }

  return matches
}
