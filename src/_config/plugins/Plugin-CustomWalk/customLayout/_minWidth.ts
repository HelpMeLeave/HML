import { typeWidth } from '@/_config/plugins/Plugin-CustomWalk/customLayout/_lib'
import type { Field } from 'payload'

export const minWidth = {
  action: (field: Field, hasSidebar: boolean) => {
    if (field.type == 'ui') return field
    const minWidth = hasSidebar ? '100%' : (field.admin?.width ?? typeWidth(field, hasSidebar))
    if (minWidth) {
      field.admin = {
        ...field.admin,
        style: {
          ...field.admin?.style,
          minWidth,
          // @ts-expect-error custom css variable
          '--minWidth': minWidth,
        },
      }
    }
    return field
  },
}
