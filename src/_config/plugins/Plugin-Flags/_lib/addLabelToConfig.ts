import type { CustomComponent, Field } from 'payload'

export type FieldWithLabelOption = Extract<
  Field,
  { admin?: { components?: { Label?: CustomComponent } } }
>

export const addLabelToConfig = (field: Field) => {
  const flagProps = field.custom?.flag

  return {
    ...field,
    admin: {
      ...field.admin,
      components: {
        ...field.admin?.components,
        Label: {
          path: '@/collections/_labels/FlagLabel/index',
          ...(flagProps ? flagProps : {}),
        },
      },
    },
  } as FieldWithLabelOption
}
