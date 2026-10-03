import { typeWidth } from '@/_config/plugins/Plugin-CustomWalk/customLayout/_lib'
import { cn } from '@/lib/cn'
import type { Field, GroupField } from 'payload'
import { fieldAffectsData, fieldIsPresentationalOnly } from 'payload/shared'

export const forGroup = {
  check: (field: GroupField) =>
    Boolean(field.custom && field.custom.layout && field.custom.layout.direction == 'row'),
  action: (field: GroupField, _hasSidebar: boolean) => {
    const thisGroup = field as GroupField

    thisGroup.fields = thisGroup.fields.map((subfield) => {
      const inSidebar = field.admin?.position == 'sidebar' || subfield.admin?.position == 'sidebar'
      const getFlex = (fieldType: Field['type']) => {
        switch (fieldType) {
          case 'text':
          case 'number':
          case 'checkbox':
          case 'select':
            return `1 1 ${typeWidth(field, inSidebar)}`
          default:
            return undefined
        }
      }
      if (fieldIsPresentationalOnly(subfield) || subfield.type == 'tabs') return subfield

      subfield.admin = {
        ...subfield.admin,
        style: {
          ...subfield.admin?.style,
          flex: subfield.admin?.style?.flex ?? getFlex(subfield.type),
        },
      }
      return subfield
    })
    return thisGroup
  },
}

export const NammedUnammed = {
  action: (field: GroupField, _hasSidebar: boolean) => {
    field.admin = {
      ...field.admin,
      className: cn(
        field.admin?.className,
        `group-field--${fieldAffectsData(field) ? '' : 'un'}named-group`
      ),
    }
    return field
  },
}
