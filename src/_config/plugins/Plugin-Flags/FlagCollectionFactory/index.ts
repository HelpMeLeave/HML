import type { CollectionConfig, CollectionSlug } from 'payload'

export const FlagCollectionFactory = ({
  baseCollection,
}: {
  baseCollection: CollectionConfig
}): { baseCollection: CollectionConfig; factories: CollectionConfig[] } => {
  const commentCollectionSlug = `flagComment-${baseCollection.slug}` as CollectionSlug
  const collectionSlug = `flagComment-${baseCollection.slug}` as CollectionSlug

  const collectionConfig: CollectionConfig = {
    slug: collectionSlug,
    fields: [
      {
        type: 'text',
        name: 'fieldPath',
        required: true,
      },
      {
        type: 'relationship',
        relationTo: 'users',
        name: 'flaggedBy',
        required: true,
      },
      {
        type: 'relationship',
        relationTo: 'users',
        name: 'resolvedBy',
      },
      {
        type: 'checkbox',
        name: 'resolved',
        required: true,
        defaultValue: false,
      },
      {
        type: 'join',
        collection: commentCollectionSlug,
        name: 'comments',
        on: 'flag',
      },
    ],
  }

  const commentCollectionConfig: CollectionConfig = {
    slug: commentCollectionSlug,
    fields: [
      {
        type: 'relationship',
        relationTo: collectionSlug,
        name: 'flag',
        required: true,
      },
      {
        type: 'relationship',
        relationTo: 'users',
        name: 'commentBy',
        required: true,
      },
      {
        type: 'relationship',
        relationTo: commentCollectionSlug,
        name: 'responseTo',
      },
      {
        type: 'date',
        name: 'createdAt',
        required: true,
      },
      {
        type: 'richText',
        name: 'comment',
        required: true,
      },
      {
        type: 'array',
        name: 'reactions',
        fields: [
          {
            type: 'text',
            name: 'reaction',
            required: true,
          },
          {
            type: 'relationship',
            name: 'reactionBy',
            relationTo: 'users',
            hasMany: false,
            required: true,
          },
          {
            type: 'date',
            name: 'reactionAt',
            required: true,
          },
        ],
      },
    ],
  }

  baseCollection.fields.push({
    type: 'relationship',
    relationTo: collectionSlug,
    name: 'flags',
    hasMany: true,
  })

  return {
    baseCollection,
    factories: [collectionConfig, commentCollectionConfig],
  }
}
