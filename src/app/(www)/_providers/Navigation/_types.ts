import type { Content, ExternalResource, Route } from '@/payload-types'

export type NavLink = {
  item:
    | {
        relationTo: 'routes'
        value: number | Route
      }
    | {
        relationTo: 'externalResources'
        value: number | ExternalResource
      }
  displayText: string
  id?: string | null
}
export type HeaderLink = {
  id: string
  displayText: string
  item: LinkItem
  description?: string
}
export type HeaderTab = HeaderLink & { links: HeaderLink[] }
export type HeaderDD = {
  description: string
  displayText: string
  id: string
  item:
    | {
        relationTo: 'routes'
        value: { url: string; id: number; doc: Partial<Content> }
      }
    | {
        relationTo: 'externalResources'
        value: number | ExternalResource
      }
}
type LinkItem =
  | {
      relationTo: 'routes'
      value: number | Route
    }
  | {
      relationTo: 'externalResources'
      value: number | ExternalResource
    }
  | { doc: { id: number; slug: string }; id: number; url: string }

export type NotNull<T> = Exclude<T, null>
