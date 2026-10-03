import { isPillar } from '@/access/PillarTeam'
import type { CollectionSlug, GlobalSlug } from 'payload'

export const PillarOnlySlugs: Record<string, Array<GlobalSlug | CollectionSlug> & string[]> = {
  Operations: ['volunteer-agreement'],
}

export const pillarOnlySwitch = (
  thisSlug: string,
  user: { isDirector: boolean },
  currentSwitch: boolean
) =>
  Object.values(PillarOnlySlugs).some((s) => s.includes(thisSlug)) ?
    Object.entries(PillarOnlySlugs).some(([k, s]) => {
      if (s.includes(thisSlug)) {
        return isPillar(user, k)
      }
      return false
    })
  : currentSwitch
