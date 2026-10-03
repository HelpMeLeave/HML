import { normalizeAdminPath } from '@/lib/normalize'
import type { CollectionSlug } from 'payload'

export const normalizeCollectionLink = (collection: CollectionSlug) =>
  normalizeAdminPath(`/collections/${collection}`)
