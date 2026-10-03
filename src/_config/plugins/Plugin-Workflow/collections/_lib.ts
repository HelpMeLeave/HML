import { type CollectionConfig, type Data, type Field, type FieldAccess } from 'payload'

export const createRecordTitleCall = (collection: CollectionConfig) => (doc?: Data) =>
  collection.admin?.useAsTitle ?
    (doc?.[collection.admin.useAsTitle] as string | undefined)
  : undefined

const whileUnlocked: FieldAccess = ({ doc }) =>
  !(doc as { currentLifecycle?: { locked?: boolean } })?.currentLifecycle?.locked

export const lockFields = (fields: Field[]): Field[] =>
  fields.map((field): Field => {
    if (field.type == 'ui' || field.type == 'join') return field

    const name = 'name' in field ? field.name : undefined

    if (name) {
      const declared = field.access?.update

      return {
        ...field,
        access: {
          ...field.access,
          update: async (args) => whileUnlocked(args) && (await (declared?.(args) ?? true)),
        },
      }
    }

    if (field.type == 'tabs')
      return {
        ...field,
        tabs: field.tabs.map((tab) => ({
          ...tab,
          fields: lockFields(tab.fields),
        })),
      }

    if ('fields' in field) return { ...field, fields: lockFields(field.fields) }

    return field
  })
