import type { CountryISO } from '@/payload-types'

// #region ! ---------- TYPES ----------
export type tIntervalKey = Exclude<keyof tInterval, 'na'>

export type tInterval = {
  na: boolean
  min: number
  max: number
}
// #endregion ! --------------------

const toItemString = (entry: tInterval, item: tIntervalKey, currency: CountryISO) => {
  if (entry[item] == 0) {
    return ''
  }
  if (item == 'max' && entry.min == entry.max) {
    return
  }

  return entry[item].toLocaleString(undefined, {
    style: 'currency',
    currency,
  })
}

export const toIntervalString = (entry: tInterval, currency: CountryISO) => {
  if (entry) {
    const entryKeys = entry.min == entry.max ? ['min'] : (['min', 'max'] as tIntervalKey[])
    return entryKeys
      .filter((ea) => entry[ea as tIntervalKey] && entry[ea as tIntervalKey] != 0)
      .map((ea) => toItemString(entry, ea as tIntervalKey, currency))
      .join(' - ')
  }
  return ''
}
