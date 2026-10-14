import type { LinkField } from '@/collections/_fields/LinkBase/_types'

export const isPopulatedDoc = (link: LinkField) =>
  Boolean(link.doc?.value) && typeof link.doc?.value === 'object'
