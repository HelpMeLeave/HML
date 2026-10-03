import type { CheckboxField } from 'payload'

export const requiredField = (required?: boolean, hidden?: boolean): CheckboxField => ({
  name: 'required',
  type: 'checkbox',
  label: 'Field is Required',
  required: true,
  defaultValue: !!required,
  admin: {
    hidden: !!hidden,
  },
})
