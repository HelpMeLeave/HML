import type { TextField } from 'payload'
import { slugify } from 'payload/shared'

export const nameField = (props?: Partial<TextField & { hasMany: false }>): TextField => ({
  name: 'name',
  type: 'text',
  label: 'Name',
  required: true,
  ...props,
  admin: {
    description: 'Lowercase, No Special Characters',
    ...props?.admin,
    style: {
      flex: '1 1 40%',
      ...props?.admin?.style,
    },
  },
  hooks: {
    ...props?.hooks,
    beforeChange: [({ value }) => slugify(value), ...(props?.hooks?.beforeChange ?? [])],
  },
})
