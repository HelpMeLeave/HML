import type { Field, FieldCustom, FieldTypes } from 'payload'

export type FieldWalker = Valid<FieldCustom['layout']>
export type FieldWalkerOptions = keyof FieldWalker

export type FieldWalkConfigValues<T extends FieldTypes> = {
  check?: FieldWalkFnCheck<T>
  action: FieldWalkFnAction<T>
}[]

export type FieldWalkConfig = {
  [T in FieldTypes]?: FieldWalkConfigValues<T>
} & {
  all?: FieldWalkConfigValues<FieldTypes>
}
type FieldWalkFnCheck<T extends FieldTypes> = (field: Field & { type: T }) => boolean
type FieldWalkFnAction<T extends FieldTypes> = (
  field: Field & { type: T },
  hasSidebar: boolean
) => Field
