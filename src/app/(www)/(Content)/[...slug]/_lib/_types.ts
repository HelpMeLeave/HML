import type { Content, ContentLifecycle, ContentRecord, Route, User } from '@/payload-types'
import type { BasePayload } from 'payload'

export type ContentRecordRoute = Sub<
  Route,
  'doc',
  {
    doc: Sub<
      Content,
      'currentLifecycle',
      {
        currentLifecycle: Sub<
          ContentLifecycle,
          'published',
          {
            published: ContentRecord
          }
        >
      }
    >
  }
>

export type HandleProps = {
  user: User | null
  url: string
  payload: BasePayload
}
