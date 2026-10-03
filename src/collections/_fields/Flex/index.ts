import type { DirectionFieldFn, DirectionOptions } from '@/collections/_fields/Flex/_types'
import { cn } from '@/lib/cn'
import type { Field, GroupField } from 'payload'

const directionField: DirectionFieldFn<'column' | 'row'> = (
  direction,
  { custom, labelSize, wrap, className, style, description, ...options },
  ...fields
) => {
  fields = fields.map((field) => {
    if (field.type == 'ui') return field
    if (direction == 'column') return field
    field.admin = {
      ...field.admin,
      style: {
        ...field.admin?.style,
        flexBasis: 'var(--field-width)',
        flexGrow: 1,
        flexShrink: 1,
      },
    }

    return field
  })

  const field = {
    ...options,
    type: 'group',
    custom: {
      ...custom,
      layout: {
        direction,
        labelSize: labelSize ?? 'base',
        wrap,
      },
    },
    admin: {
      ...options.admin,
      hideGutter: options.admin?.hideGutter ?? true,
      style: {
        ...options.admin?.style,
        ...style,
        '--direction': direction,
      },
      className: cn(
        options.admin?.className,
        className,
        `direction-${direction} *:*:[--direction:${direction}]`
      ),
      description,
    },
    fields,
  } as GroupField

  return field
}

const rowField = (options: DirectionOptions, ...fields: Field[]) =>
  directionField('row', options, ...fields)

const columnField = (options: DirectionOptions, ...fields: Field[]) =>
  directionField('column', options, ...fields) as GroupField

export { columnField, rowField }
