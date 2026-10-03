import type {
  ClientFieldProps,
  FieldPermissions,
  SanitizedBlocksPermissions,
  SanitizedFieldsPermissions,
} from 'payload'

type Permission = {
  permissions?:
    | true
    | {
        blocks?: SanitizedBlocksPermissions
        create: true
        fields?: SanitizedFieldsPermissions
        read: true
        update: true
      }
}

export const getPermissions = ({
  permissions,
  args,
}: {
  permissions?: Pick<FieldPermissions, 'read' | 'update'>
  args?: Partial<ClientFieldProps> & Permission
}) => {
  const permission = permissions ?? args?.permissions

  if (!permission)
    return {
      canRead: false,
      canWrite: false,
      disabled: true,
      readOnly: true,
    }
  if (typeof permission == 'boolean') {
    return { canRead: true, canWrite: true, disabled: false, readOnly: false }
  }

  const disabledField = (permission.update as boolean) ?? (permission.update as boolean) ?? false

  return {
    canRead: (permission.read as boolean) ?? (permission.read as boolean) ?? false,
    canWrite: disabledField,
    disabled: !disabledField,
    readOnly: !disabledField,
  }
}
