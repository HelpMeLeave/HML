import type { LinkField } from '@/collections/_fields/LinkBase/_types'
import { env } from '@/env'
import type { Content, Document, Media, Route } from '@/payload-types'

type DocLinkField = LinkField & {
  linkType: 'internal'
  doc: Valid<LinkField['doc']>
  url?: never
}

export const parseBaseURL = (...segments: string[]) =>
  '/' + segments.filter(Boolean).join('/').replace(/^\/+/, '')

const host = (url: string) =>
  url
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .split('/')[0]

/**
 * Whether an href actually leaves the site — the single authority for `target`.
 * A relative path, `mailto:`, `tel:` or `#anchor` is never off-site, and neither is an absolute URL on our own host.
 * `linkType` cannot answer this: it only says which field holds the href.
 */
export const isOffSite = (url?: string | null) => {
  if (!url || !/^https?:\/\//i.test(url)) return false
  return host(url) != host(env.NEXT_PUBLIC_BASE_URL)
}

const resolveDoc = ({ doc: { relationTo, value }, newTab }: DocLinkField) => {
  const target = Boolean(newTab) ? '_blank' : '_self'

  if (relationTo === 'media') {
    return {
      url: parseBaseURL('media', encodeURIComponent((value as Media).filename ?? '')),
      target,
      offsite: false,
    }
  }

  // PDFs are served from UploadThing through /media/pdfs/[filename]; documents have no slug, so the fallback below sent them to the home page
  if (relationTo == 'documents') {
    return {
      url: parseBaseURL('media', 'pdfs', encodeURIComponent((value as Document).filename ?? '')),
      target,
      offsite: false,
    }
  }

  if (relationTo == 'routes') {
    const content = value as Route
    return {
      url: parseBaseURL(content.url),
      target,
      public: content.public,
      offsite: false,
    }
  }

  if (relationTo == 'externalResources') {
    const page = value as Route
    return {
      url: page.url,
      // These point off-site by definition, so the href decides, not the checkbox.
      target: isOffSite(page.url) ? '_blank' : target,
      offsite: true,
    }
  }

  // content, or any other collection with a slug
  const slugged = value as Content | Document | { slug: string }
  return {
    url: parseBaseURL('slug' in slugged ? slugged.slug! : ''),
    target,
  }
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

const isUrlLink = (link: LinkField) => ['custom', 'external'].includes(link.linkType)

const isPopulatedDoc = (link: LinkField) =>
  Boolean(link.doc?.value) && typeof link.doc?.value === 'object'
