import { toTitleCase } from '@/lib/textCasing'

// #region ! ---------- TYPES ----------
export type tUnit = 'day' | 'week' | 'month' | 'year'

export type tItem = {
  uom: tUnit
  qty: number
  business: boolean
}
export type tIntervalKey = Exclude<keyof tInterval, 'check'>

export type tInterval = {
  min: tItem
  max: tItem
  check: Record<'minDays' | 'maxDays', number>
}

export type tProcessingItem = Omit<tItem, 'uom'> & {
  uom: tUnit | undefined | ''
}

export type tProcessingItemFnProp = (tProcessingItem | undefined)[]

export type tAltMatchEntryProps = { entry: string; alts: string[] }
// #endregion ! --------------------

const toItemString = (entry: tInterval, item: tIntervalKey) => {
  if (entry[item].qty == 0) {
    return ''
  }

  const parsePlural = entry[item].qty > 1 && !entry[item].uom.endsWith('s') ? 's' : ''

  const parseUOM = entry[item].uom && entry[item].uom != null ? entry[item].uom + parsePlural : ''

  return `${entry[item].qty} ${
    item == 'max' || entry.min.uom != entry.max.uom ?
      entry[item].business ?
        toTitleCase(('business ' + parseUOM).toString())
      : toTitleCase(parseUOM)
    : ''
  }`
}

export const toIntervalString = (entry: tInterval) => {
  return (Object.keys(entry.min) as Array<keyof tItem>).every((m) => entry.min[m] == entry.max[m]) ?
      toItemString(entry, 'max')
    : [toItemString(entry, 'min'), toItemString(entry, 'max')].join(' - ')
}

export const cleanUp = (entry: string) => entry?.toLowerCase().trim()
