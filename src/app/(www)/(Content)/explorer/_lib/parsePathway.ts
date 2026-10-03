import type { Country } from '@/payload-types'
import type { ExplorerPathwayData } from 'www/(Content)/explorer/_types'

export const parsePathway = (
  finalPathway: ExplorerPathwayData,
  pathway: {
    id: number
    country: string | Country
    countryName?: string | null
  } & Partial<Record<keyof ExplorerPathwayData, boolean | null | undefined>>
) => {
  const keys = Object.keys(finalPathway) as Array<keyof ExplorerPathwayData>
  keys.forEach((k) => {
    if (finalPathway[k] == false && pathway[k] == true) {
      finalPathway[k] = pathway[k]
    }
  })
  return finalPathway
}
