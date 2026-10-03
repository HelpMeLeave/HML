import type { TextField } from 'payload'

const SlugFieldPath = '@/collections/ContentCollections/Content/_fields/Slug/Field'

export const SlugField: TextField = {
  type: 'text',
  name: 'slug',
  admin: {
    position: 'sidebar',
    condition: (data, _, { operation }) => {
      return data?.contentType && operation == 'create'
    },
    components: {
      Field: SlugFieldPath,
    },
  },
  required: true,
  access: {
    update: () => false,
  },
  typescriptSchema: [
    ({ jsonSchema }) => ({
      ...jsonSchema,
      type: 'string',
      required: true,
      additionalProperties: false,
    }),
  ],
}
