import type { CheckboxField } from 'payload'

export const SlugGeneratedField: CheckboxField = {
  type: 'checkbox',
  name: 'slugGenerated',
  defaultValue: true,
  required: true,
  admin: {
    position: 'sidebar',
    hidden: true,
  },
}
