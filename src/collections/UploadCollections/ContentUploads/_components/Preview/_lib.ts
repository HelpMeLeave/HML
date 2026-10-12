import type { NumberField } from 'payload'

export const ValueField = (name: string, defaultValue: number): NumberField => ({
  name,
  defaultValue,
  type: 'number',
  min: 0,
  admin: { width: '50px', condition: (_data, siblingdata) => siblingdata?.activate == true },
})
