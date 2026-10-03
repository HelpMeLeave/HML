import {
  type tAltMatchEntryProps,
  type tProcessingItem,
  type tUnit,
  cleanUp,
} from '@/collections/DataCollections/Pathways/components/IntervalField/util'

const inputNormalization: Record<tUnit, string[]> = {
  year: ['years', 'year', 'yr', 'yrs', 'yar', 'y', 'ys'],
  month: ['months', 'month', 'mnth', 'mnths', 'm', 'ms'],
  week: ['weeks', 'week', 'wk', 'wks', 'wek', 'weks', 'w', 'ws'],
  day: ['days', 'day', 'dys', 'dy', 'd', 'ds'],
}

const isBusinessDays = (uom: string) =>
  uom.includes('bus')
  && uom
    .split(' ')
    .filter((ea) => !ea.includes('bus'))
    .some((ea) => ea.includes('d'))

const isAltUom = ({ entry, alts }: tAltMatchEntryProps) => alts.includes(entry)

const hasMoreMatches = (matches: boolean[]) =>
  matches.filter((ea) => ea).length > matches.filter((ea) => !ea).length

const getLetterMatches = ({ entry, alts, uom }: tAltMatchEntryProps & { uom: string }) =>
  alts.map((a) => {
    const aCount = a
      .split('')
      .map((x) => entry.includes(x))
      .filter(Boolean).length
    return aCount > a.length * 0.66 && a[0] == uom[0]
  })

export const checkForExact = (uom: string, data: tProcessingItem) => {
  if (isBusinessDays(uom)) {
    data.uom = 'day'
    data.business = true
    return data
  }

  const uomParsed = cleanUp(uom)

  Object.entries(inputNormalization).forEach(([k, uomAlts]) => {
    const uomKey = k as tUnit
    if (isAltUom({ entry: uomParsed, alts: uomAlts })) {
      data.uom = uomKey
      return null
    }
    if (hasMoreMatches(getLetterMatches({ entry: uomParsed, alts: uomAlts, uom }))) {
      data.uom = uomKey
    }
  })

  return data
}
