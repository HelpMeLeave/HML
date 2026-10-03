import { isNumber, slugify } from 'payload/shared'

/** quick parse to array value */
export const toArray = <T>(val: T | Array<T>): T[] => (Array.isArray(val) ? val : [val])

/** Parse an array of strings into the correct slug format */
export const toSlug = (...values: string[]) => values.map(slugify).join('-').replace(/-{2,}/g, '-')

/** Returns the number value of a non-number entry, with an optional fallback if it can't be parsed */
export const toNumber = (entry: unknown, returnAs?: unknown) =>
  isNumber(entry) ? Number(entry) : (returnAs ?? entry)
