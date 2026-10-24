import type { Content, ExternalResource } from '@/payload-types'
import type { RelationValue } from 'payload-types'

export type NavLink = {
  item: RelationValue<'routes' | 'externalResources'>
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
  | RelationValue<'routes' | 'externalResources'>
  | { doc: { id: number; slug: string }; id: number; url: string }

export type NotNull<T> = Exclude<T, null>
