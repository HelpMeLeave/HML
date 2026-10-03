import { isTraversable } from '@/lib/normalize/is'

const checkThisLevel = (initialObj: Record<string, unknown>, newObj: Record<string, unknown>) => {
  if (isTraversable(newObj)) {
    const newKeys = Object.keys(newObj).filter((key) => !Object.keys(initialObj).includes(key))

    if (newKeys.length > 0) {
      newKeys.forEach((key) => {
        initialObj[key] = newObj[key]
      })
    }
  }
  return initialObj
}

export const mergeObj = (initialObj: Record<string, unknown>, newObj: Record<string, unknown>) => {
  return Object.entries(initialObj).reduce((prev, [key, val]) => {
    if (!(key in prev)) prev[key] = val

    prev = checkThisLevel(prev, newObj)

    if (key in newObj) {
      const thisStep = newObj[key]
      if (typeof thisStep == 'string') {
        prev[key] = thisStep
      } else {
        prev[key] = mergeObj(
          prev[key] as Record<string, unknown>,
          thisStep as Record<string, unknown>
        )
      }
    }
    return prev
  }, initialObj)
}
