import type { RelationshipField } from 'payload'

export const tagField = (...tagTypes: string[]): RelationshipField => ({
  type: 'relationship',
  name: 'tags',
  relationTo: 'tag',
  hasMany: true,
  admin: {
    custom: { tagTypes },
    components: {
      Field: '@/collections/UploadCollections/Documents/TagField/TagField.server',
    },
  },
})
