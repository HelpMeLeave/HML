import { BaseCellPath } from '@/collections/_lib'
import type { FieldCustomLayout } from '@/payload-types'
import type { RadioField } from 'payload'

const RadioFieldPath = '@/collections/_lib/Radio/Field'

type RadioOptions = Omit<RadioField, 'type' | 'name' | 'options' | 'admin'> & {
  admin?: Omit<Valid<RadioField['admin']>, 'layout'>
  size?: FieldCustomLayout['labelSize']
  direction?: Valid<RadioField['admin']>['layout']
}

export const RadioConfig = (
  name: string,
  options: RadioField['options'],
  args?: RadioOptions
): RadioField => {
  const { size, direction, admin, ...otherArgs } = args ?? {
    size: 'small',
  }

  const { Cell, Field } = admin?.components ?? {}

  return {
    ...otherArgs,
    name,
    type: 'radio',
    options,
    custom: {
      ...otherArgs.custom,
      layout: {
        ...otherArgs.custom?.layout,
        labelSize: size ?? 'base',
      },
    },
    admin: {
      ...admin,
      layout: direction,
      components: {
        ...admin?.components,
        Cell: Cell ?? BaseCellPath,
        Field: Field ?? { path: RadioFieldPath, clientProps: { labelSize: size } },
      },
    },
  } as RadioField
}
