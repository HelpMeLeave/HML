import { en } from '@/_config/i18n/languages/en'

export const pluralKeys = Object.fromEntries(
  Object.values(en)
    .flatMap((ea) => {
      const returns = [] as string[][]
      Object.entries(ea).forEach(([childKey, childEntry]) => {
        if (childEntry.plural) {
          returns.push([
            childKey,
            childEntry.plural
              .split(' ')
              .map((item, i) => {
                if (i == 0) return item
                return item[0].toUpperCase() + item.slice(1)
              })
              .join(''),
          ])
        }
      })
      return returns
    })
    .filter(Boolean)
)
