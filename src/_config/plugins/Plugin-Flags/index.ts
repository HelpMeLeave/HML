import { getFlaggedCollections } from '@/_config/plugins/Plugin-Flags/_lib/getFlaggedCollections'
import { parseFields } from '@/_config/plugins/Plugin-Flags/_lib/parseFields'
import { FlagCollectionFactory } from '@/_config/plugins/Plugin-Flags/FlagCollectionFactory'
import { definePlugin } from 'payload'

export const PluginWorkflows = definePlugin({
  slug: 'flags',
  plugin({ config }) {
    const { collections } = config
    if (!collections) return config

    const flaggedCollections = getFlaggedCollections(collections)

    flaggedCollections.forEach((collection) => {
      collection.fields = parseFields(collection.fields)
      const { factories } = FlagCollectionFactory({
        baseCollection: collection,
      })

      collections.push(...factories)
      collections[collection.arrIndex] = collection
    })

    throw Error(JSON.stringify(config.collections))
    return config
  },
})
