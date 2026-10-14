import type { LinkField } from '@/collections/_fields/LinkBase/_types'
import { isOffSite } from '@/lib/normalize/isOffSite'
import { isPopulatedDoc } from '@/lib/normalize/isPopulatedDoc'
import { isUrlLink } from '@/lib/normalize/isUrlLink'
import { resolveDoc } from '@/lib/normalize/resolveDoc'

export type DocLinkField = LinkField & {
  linkType: 'internal'
  doc: Valid<LinkField['doc']>
  url?: never
}

/**
 * Returns a resolved URL string.
 * Use when you only need the href (e.g. CTA block renderer).
 */
export const resolveLink = (link: LinkField): string => {
  if (isUrlLink(link) || !isPopulatedDoc(link)) return link.url ?? ''
  return resolveDoc(link as DocLinkField).url
}

/**
 * Returns the full resolved link object including target and draft status.
 * Use when rendering inline links (e.g. Lexical rich text).
 * Off-site hrefs open in a new tab; everything else honours the newTab checkbox.
 */
export const resolveLinkNode = (link: LinkField) => {
  if (isUrlLink(link) || !isPopulatedDoc(link)) {
    const url = link.url ?? ''
    return {
      url,
      target: isOffSite(url) ? '_blank' : '_self',
      offsite: isOffSite(url),
    }
  } else {
    return resolveDoc(link as DocLinkField)
  }
}
