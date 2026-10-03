'use server'

import type { Config } from '@/payload-types'
import type { BasePayload, CollectionSlug, PayloadRequest } from 'payload'

type EntryItem<S extends CollectionSlug> = Valid<Config['collections']>[S]
export type NormalizeCollectionObjectReturn<S extends CollectionSlug> =
  { status: false; entry: null } | { status: true; entry: EntryItem<S> }

export const normalizeCollectionObject = async <S extends CollectionSlug>(
  entry: { id: number } | number | null | undefined,
  collection: S,
  payload: BasePayload,
  req?: PayloadRequest
) => {
  if (entry) {
    {
      const returns = {
        status: false,
        entry: null,
      } as NormalizeCollectionObjectReturn<S>

      if (typeof entry == 'number') {
        const data = await payload.findByID({
          collection: collection,
          id: entry,
          req: req,
        })
        if (data) {
          returns.status = true
          returns.entry = data as EntryItem<S>
        }
      } else if (typeof entry == 'object') {
        returns.status = true
        returns.entry = entry as EntryItem<S>
      }
      return returns
    }
  }
}
