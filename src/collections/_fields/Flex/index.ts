import type {
  DirectionFieldFn,
  DirectionOptions,
  RowColumnConfigOptions,
} from '@/collections/_fields/Flex/_types'
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

export const rowField = (options: DirectionOptions, ...fields: Field[]) =>
  directionField('row', options, ...fields)

export const columnField = (options: DirectionOptions, ...fields: Field[]) =>
  directionField('column', options, ...fields) as GroupField

export const ColumnConfig = (
  name: string,
  { width, position, ...options }: RowColumnConfigOptions,
  ...fields: Field[]
) => RowColumnConfig('column', name, { width, position, ...options }, ...fields)

export const RowConfig = (
  name: string,
  { width, position, ...options }: RowColumnConfigOptions,
  ...fields: Field[]
) => RowColumnConfig('row', name, { width, position, ...options }, ...fields)

const RowColumnConfig = (
  direction: 'row' | 'column',
  name: string,
  { width, position, ...options }: RowColumnConfigOptions,
  ...fields: Field[]
) =>
  directionField(
    direction,
    { name, ...options, admin: { ...options.admin, width, position } },
    ...fields
  ) as GroupField
