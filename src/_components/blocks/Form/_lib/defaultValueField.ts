import type { CheckboxField, NumberField, TextField } from 'payload'

export const defaultValueField = {
  number: {
    name: 'defaultValue',
    type: 'number',
    label: 'Default Value',
    admin: {
      style: {
        flex: '1 1 40%',
      },
    },
  } as NumberField,
  text: {
    name: 'defaultValue',
    type: 'text',
    label: 'Default Value',
    admin: {
      style: {
        flex: '1 1 40%',
      },
    },
  } as TextField,
  checkbox: {
    name: 'defaultValue',
    type: 'checkbox',
    label: 'Checked by default',
    required: true,
    defaultValue: false,
  } as CheckboxField,
}
