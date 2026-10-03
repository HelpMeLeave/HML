import type { FieldCustomLayout, FieldCustomOptions } from '@/payload-types'
import type { Field, GroupField } from 'payload'
import type { FieldAdmin } from 'payload-types'

type CustomWithoutLayout = Omit<FieldCustomOptions, 'layout'>

export type DirectionOptions = Omit<GroupField, 'custom' | 'fields' | 'type'> & {
  name?: string
  custom?: CustomWithoutLayout
  wrap?: FieldCustomLayout['wrap']
  labelSize?: FieldCustomLayout['labelSize']
} & Pick<FieldAdmin, 'className' | 'style' | 'description'>

export type DirectionFieldFn<D extends FieldCustomLayout['direction']> = (
  direction: D,
  { custom, labelSize, wrap, className, style, description, ...options }: DirectionOptions,
  ...fields: Field[]
) => GroupField
