export type PillarNames =
  'Tech' | 'Support' | 'Strategy' | 'Operations' | 'Marketing' | 'Community Intelligence & Impact'

export type PillarNamesLower = Lowercase<PillarNames>

export const PILLARS = [
  { name: 'Tech', value: 'tech', id: 1 },
  { name: 'Support', value: 'support', id: 2 },
  { name: 'Strategy', value: 'strategy', id: 3 },
  { name: 'Operations', value: 'operations', id: 4 },
  { name: 'Marketing', value: 'marketing', id: 5 },
  { name: 'Community Intelligence & Impact', value: 'cii', id: 6 },
]
