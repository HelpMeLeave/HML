import type { LinkField } from '@/collections/_fields/LinkBase/_types'

export const isUrlLink = (link: LinkField) => ['custom', 'external'].includes(link.linkType)
