import { checkForExact } from '@/collections/DataCollections/Pathways/components/IntervalField/checkForExact'
import {
  cleanUp,
  type tProcessingItem,
  type tProcessingItemFnProp,
  type tUnit,
} from '@/collections/DataCollections/Pathways/components/IntervalField/util'
import { isText } from '@/lib/normalize/is'
import { toNumber } from '@/lib/normalize/to'
import { isNumber } from 'payload/shared'

const INPUT_REG_MATCHER = /(\d+ ?[a-z ]*)/gi

const arryKeyMatch = {
  qty: (x: tProcessingItem | undefined) => x?.qty,
  uom: (x: tProcessingItem | undefined) => x?.uom,
}

const badStringMatches = (items?: tProcessingItemFnProp): items is undefined =>
  !items || items.every((x) => x?.uom == '') || items.some((x) => x?.qty == 0)

const dualMatch = (items: tProcessingItemFnProp) =>
  items.every(arryKeyMatch.qty) && items.every(arryKeyMatch.uom)

const getGroupUOM = (items: tProcessingItemFnProp) =>
  items.reduce((final, x): tUnit => {
    if (!x || !x.uom) return final

    return String(x.uom) == 'undefined' || x.uom == undefined ? final : ((final + x.uom) as tUnit)
  }, '' as tUnit)

export const proccessEntry = (entry: string) => {
  const asStrings = entry.match(INPUT_REG_MATCHER)?.map((m) => {
    const match = cleanUp(m)
      .matchAll(/(\d+) ?([a-z ]*)/gi)
      .next()
      .value?.map((ea) => toNumber(cleanUp(ea)))

    const data: tProcessingItem = {
      uom: undefined,
      qty: 0,
      business: false,
    }

    if (!match) return

    if (isNumber(match[1])) {
      data.qty = Number(match[1])
      if (match[2] == 0 && match[1] == match[0]) {
        data.uom = undefined
        return data
      }
    }
    if (isText(match[2])) return checkForExact(match[2], data)
  })

  if (badStringMatches(asStrings)) return undefined
  if (!dualMatch(asStrings)) {
    const uom: tUnit = getGroupUOM(asStrings)

    asStrings.forEach((_, i) => {
      if (asStrings[i]) {
        asStrings[i].uom = uom
        asStrings[i].business = asStrings.some((x) => x?.business)
      }
    })
  }
  return asStrings
}
