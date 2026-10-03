import type { BaseFieldProps } from '@/collections/_lib/_types'
import type { FieldCustomLayout } from '@/payload-types'
import type { CheckboxField, GroupField, RadioField } from 'payload'

const CheckboxCellPath = '@/collections/_lib/Checkbox/Cell'

export const CheckboxConfig = (
  name: string,
  options?: Omit<CheckboxField, 'type' | 'name'>
): CheckboxField =>
  ({
    ...options,
    name,
    type: 'checkbox',
    admin: {
      ...options?.admin,
      components: {
        ...options?.admin?.components,
        Cell: CheckboxCellPath,
      },
    },
  }) as CheckboxField

const CheckboxGroupFieldPath = '@/collections/_lib/Checkbox/GroupField'

type CheckboxGroupOptions = Omit<BaseFieldProps<GroupField>, 'fields' | 'label' | 'admin'> & {
  admin?: Omit<Valid<GroupField['admin']>, 'layout'>
  size?: FieldCustomLayout['labelSize']
  direction?: Valid<RadioField['admin']>['layout']
}

export type CheckboxGroupEntry = {
  name: string
  label?: CheckboxField['label']
  options?: Omit<BaseFieldProps<CheckboxField>, 'label'>
}

export const CheckboxGroupConfig = (
  label: string,
  entries: CheckboxGroupEntry[],
  options?: CheckboxGroupOptions
) => {
  const { size, direction, admin, ...otherArgs } = options ?? {}
  const { Field } = admin?.components ?? {}

  return {
    ...otherArgs,
    label,
    type: 'group',
    custom: {
      ...otherArgs.custom,
      layout: {
        ...otherArgs.custom?.layout,
        labelSize: size,
        direction: direction == 'horizontal' ? 'row' : 'column',
      },
    },
    admin: {
      ...admin,
      components: {
        ...admin?.components,
        Field: Field ?? {
          path: CheckboxGroupFieldPath,
          serverProps: {
            labelSize: size,
            direction,
            items: entries.map((ea) => ea.name),
          },
          clientProps: {
            labelSize: size,
            direction,
            items: entries.map((ea) => ea.name),
          },
        },
      },
    },
    fields: entries.map(({ name, label, ...otherEa }) => ({
      ...otherEa.options,
      name,
      label,
      type: 'checkbox',
    })),
  } as GroupField
}
