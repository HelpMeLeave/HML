import type { TextField } from 'payload'

export const placeholderField = (props?: Partial<TextField & { hasMany?: false }>): TextField => ({
  name: 'placeholder',
  type: 'text',
  label: 'Placeholder',
  ...props,
})
