import type { Country } from '@/payload-types'

export type ExplorerMasonaryDrawer = {
  status: boolean
  size: '' | 'sm' | 'md' | 'lg'
}

export type ExplorerMasonaryFilter = {
  key: keyof ExplorerPathwayData | keyof ExplorerBase
  value: boolean
  matches: (
    country: ExplorerCountry,
    key: keyof ExplorerCountry | keyof ExplorerPathwayData
  ) => boolean
}

export type tDrawerFilter = {
  label: string
  dataKey: ExplorerMasonaryFilter['key']
  matches: ExplorerMasonaryFilter['matches']
}

export type tDrawerFilterGroup = {
  group: string
  items: tDrawerFilter[]
}

export type ExplorerBase = Record<ExplorerCountryKey, ExplorerCountry>
type ExplorerCountryKey = Country['id']
export type ExplorerCountry = {
  name: Country['name']
  community: {
    prideSafety: boolean
    transSafety: boolean
    racismRank: number | null
    unMember: boolean
  }
  pathways: {
    monthlyIncome: boolean
    jobRequired: boolean
    age1830: boolean
    age60plus: boolean
    travellingWithKids: boolean
    education: boolean
    digitalWorker: boolean
    entrepreneur: boolean
  }
  images: {
    handle: string
    havePhoto: boolean
    height: number
    name: string
    width: number
  }
}

export type ExplorerPathwayData = ExplorerCountry['pathways']
export type ExplorerCommunityData = ExplorerCountry['community']

export type ExplorerParsed = {
  id: Country['id']
} & ExplorerCountry

export type ExplorerCommunityAttrs = ExplorerCommunityData & {
  isUn?: boolean
}
