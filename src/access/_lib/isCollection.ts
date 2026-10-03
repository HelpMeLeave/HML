import type { Collection } from 'payload-types'

export const isCollection = <C extends Collection>(entry: unknown | unknown[]): entry is C[] | C =>
  (Array.isArray(entry) ? entry : [entry]).every((e) => typeof e != 'number')
