import { env } from '@/env.client'
import { host } from './host'

/**
 * Whether an href actually leaves the site — the single authority for `target`.
 * A relative path, `mailto:`, `tel:` or `#anchor` is never off-site, and neither is an absolute URL on our own host.
 * `linkType` cannot answer this: it only says which field holds the href.
 */

export const isOffSite = (url?: string | null) => {
  if (!url || !/^https?:\/\//i.test(url)) return false
  return host(url) != host(env.NEXT_PUBLIC_BASE_URL)
}
