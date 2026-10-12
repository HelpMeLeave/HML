export type DefinitionMatch = {
  end: number
  nodeKey: string
  start: number
  termID: number
  // The matched substring, kept so a match can be re-located after an edit shifts its offsets.
  text: string
  instance: number
}

export type MarkState = {
  active: boolean
  matches: DefinitionMatch[]
}

export type TermIndex = {
  // Exact matched text -> term id, for the case-sensitive pass.
  byExact: Map<string, number>
  // Lowercased matched text -> term id, for the case-insensitive pass.
  byLower: Map<string, number>
  // `term` and aliases: case folds.
  insensitive: false | RegExp
  // `abbreviation`: case does not fold. Short strings false-positive badly when folded ("IDP" inside "idps").
  sensitive: false | RegExp
}

export type MatchHit = Omit<DefinitionMatch, 'nodeKey'>
