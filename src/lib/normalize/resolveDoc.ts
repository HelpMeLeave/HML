import { type DocLinkField } from '@/lib/normalize/resolveLink'
import type { Content, Document, Media, Route } from '@/payload-types'
import { isOffSite } from './isOffSite'
import { parseBaseURL } from './parseBaseURL'

export const resolveDoc = ({ doc: { relationTo, value }, newTab }: DocLinkField) => {
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
