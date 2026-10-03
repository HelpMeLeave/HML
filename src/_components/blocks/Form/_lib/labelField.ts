import type { TextField } from 'payload'

export const labelField = (props?: Partial<TextField & { hasMany: false }>): TextField => ({
  name: 'label',
  type: 'text',
  label: 'Label',
  localized: true,
  required: true,
  ...props,
  hasMany: false,
  admin: {
    ...props?.admin,
    width: '50%',
    style: {
      flex: '1 1 50%',
      ...props?.admin?.style,
    },
  },
})
