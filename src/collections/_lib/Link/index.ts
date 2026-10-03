import type { BaseFieldProps } from '@/collections/_lib/_types'
import type { TextField } from 'payload'

const LinkFieldPath = '@/collections/_lib/Link/Field'
export const LinkCellPath = '@/collections/_lib/Link/Cell'

export const LinkConfig = (name: string, options?: BaseFieldProps<TextField>): TextField =>
  ({
    ...options,
    type: 'text',
    name,
    admin: {
      ...options?.admin,
      components: {
        ...options?.admin?.components,
        Field: options?.admin?.components?.Field ?? LinkFieldPath,
        Cell: options?.admin?.components?.Cell ?? LinkCellPath,
      },
    },
  }) as TextField
