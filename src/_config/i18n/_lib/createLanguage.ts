import { pluralKeys } from '@/_config/i18n/_lib/createKey'
import { type Area, type Entry, type Lang } from '@/_config/i18n/_types'
import { _areas } from '@/_config/i18n/FIELDS'

export const createLanguage = (entry: Lang): Lang => {
  const language = Object.fromEntries(_areas.map((ea) => [ea as Area, {} as Entry<Area>]))

  _areas.forEach((area) => {
    const thisArea = entry[area]
    language[area] = {}
    Object.entries(thisArea).forEach(([itemKey, { entry, plural }]) => {
      Object.assign(language[area], {
        [itemKey]: entry,
        [`${itemKey}Plural`]: plural ?? entry,
      })
      if (plural) {
        Object.assign(language[area], {
          [pluralKeys[itemKey]]: plural,
        })
      }
    })
  })
  return language as Lang
}
