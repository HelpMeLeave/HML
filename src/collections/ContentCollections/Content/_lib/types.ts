import type { Pillar, Team, User } from '@/payload-types'
import type { CollectionSlug, PayloadRequest } from 'payload'

export type tContentType =
  'blog' | 'resource' | 'statement' | 'report' | 'newsCommentary' | 'hub' | 'other'

export type CreateQuryReturn = {
  collection: CollectionSlug
  where: {
    id: {
      in: (number | Pillar | Team | User)[]
    }
  }
  select: {
    name: boolean
  }
  req: PayloadRequest
  context: {
    appendName: string | undefined
  }
}
