type DirectorTier = ['Director', 'Head', 'Lead', 'Contributor']

type RoleTier<N extends TIER> = {
  name: DirectorTier[N]
  value: N
}

type RoleTiers = RoleTier<TIER>[]
export type TIER = 0 | 1 | 2 | 3
export type TIER_TITLE = DirectorTier[TIER]

export const ROLE_TIERS: RoleTiers = [
  { name: 'Director', value: 0 },
  { name: 'Head', value: 1 },
  { name: 'Lead', value: 2 },
  { name: 'Contributor', value: 3 },
]
