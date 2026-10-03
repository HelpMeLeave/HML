import { toUpperCase } from '@/lib/textCasing'
import type { TextField, TextFieldSingleValidation } from 'payload'

const isoCodeValidation: TextFieldSingleValidation = (value) => {
  ;[
    {
      status: typeof value == 'string',
      message: 'ISO code must be a string',
    },
    {
      status: /^[A-Za-z]{3}$/.test((value ?? '').trim()),
      message: 'ISO code must be exactly 3 alphabetic characters',
    },
  ].forEach(({ status, message }) => {
    if (!status) return message
  })

  return true
}

export const isoField: TextField = {
  type: 'text',
  name: 'id',
  unique: true,
  required: true,
  custom: { length: 3 },
  label: 'ISO Code',
  admin: {
    hidden: true,
    description: 'ISO 3-letter alpha code',
  },
  validate: isoCodeValidation,
  hooks: { beforeChange: [toUpperCase] },
}

export const isoStringField: TextField = {
  required: true,
  type: 'text',
  name: 'idString',
  virtual: true,
  label: 'ISO',
  admin: {
    readOnly: true,
    description: 'ISO 3-letter alpha code',
  },
}
