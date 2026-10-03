import { toTitleCase } from '@/lib/textCasing'
import type { TextField } from 'payload'

export const NameField = (
  options?: Omit<TextField, 'type' | 'name'> & {
    name?: string
  }
): TextField => {
  const beforeChangeHooks = options?.hooks?.beforeChange || []

  return {
    ...options,
    type: 'text',
    name: options?.name ?? 'name',
    hooks: {
      ...options?.hooks,
      beforeChange: [
        ...beforeChangeHooks,
        ({ value }) => {
          if (value) {
            value = toTitleCase(value as string)
          }
          return value
        },
      ],
    },
  } as TextField
}
