import type { CollectionConfig } from 'payload'

export const addFlagCollector = (collection: CollectionConfig) =>
  collection.fields.push({
    type: 'json',
    name: 'flags',
    defaultValue: [],
    admin: {
      hidden: true,
    },
  })
