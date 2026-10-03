import { isTraversable } from '@/lib/normalize/is'
import type { CollectionConfig } from 'payload'

const collectionHasFlagField = (collection: CollectionConfig) =>
  collection.fields.findIndex((ea) => 'name' in ea && ea.name == 'flags') == -1

const collectionHasFlagConfig = (collection: CollectionConfig) =>
  collection.custom?.flags === true || isTraversable(collection.custom?.flags)

export const getFlaggedCollections = (items: CollectionConfig[]) =>
  items.reduce(
    (flagged, current, idx) => {
      if (collectionHasFlagConfig(current) && !collectionHasFlagField(current)) {
        flagged.push({ ...current, arrIndex: idx })
      }
      return flagged
    },
    [] as (CollectionConfig & { arrIndex: number })[]
  )
