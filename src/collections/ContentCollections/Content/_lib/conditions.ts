import type { tContentType } from '@/collections/ContentCollections/Content/_lib/types'
import type { Condition, Data } from 'payload'

export const contentTypes: tContentType[] = [
  'blog',
  'newsCommentary',
  'report',
  'resource',
  'statement',
  'hub',
  'other',
]

export const contentTypeCondition =
  (...contentTypes: tContentType[]) =>
  (data: Data) => {
    return contentTypes?.includes(data?.contentType)
  }

export const hasContentType: Condition<AnySafe, AnySafe> = (data, _siblingData, { operation }) =>
  operation != 'create' || data?.contentType

export const contentNotHub: Condition<AnySafe, AnySafe> = (data, _siblingData, props) =>
  hasContentType(data, _siblingData, props)
  && data.contentType != 'hub'
  && data.contentType != 'other'
