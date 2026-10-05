import type { PayloadFoldersSelect } from '@/payload-types'
import type { CollectionConfig, Config } from 'payload'
import process from 'process'

const collectionOverrides: Exclude<Valid<Config['folders']>, false>['collectionOverrides'] = [
  ({ collection }) => {
    let thisCollection: CollectionConfig<'payload-folders'> = collection

    thisCollection = {
      ...thisCollection,
      admin: {
        ...thisCollection.admin,
        groupBy: true,
        defaultColumns: ['name', 'folderType', 'updatedAt'] as (keyof PayloadFoldersSelect<true>)[],
      },
      enableQueryPresets: true,
    }

    return thisCollection as CollectionConfig
  },
]

export const folders = {
  collectionOverrides,
  collectionSpecific: true,
  browseByFolder: true,
  debug: process.env.NODE_ENV == 'development' ? true : undefined,
}
