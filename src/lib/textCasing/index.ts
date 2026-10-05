import type { FieldHook } from 'payload'

export const toCamelCase = (str: string) =>
  str
    .replace(/[-_ ]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^./, (match) => match.toLowerCase())

export const fromCamelCase = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())

export const toUpperCase: FieldHook = ({ value }) => value?.toUpperCase() || null

export { toTitleCase } from './toTitleCase'
