import type { AccessPermissionsFnReturn } from '@/_components/views/Dashboard/_lib'
import type { ClientCollectionConfig, ClientGlobalConfig } from 'payload'

export const getUserViewables = <T extends ClientGlobalConfig | ClientCollectionConfig>(
  sections: Valid<T[]>,
  permissions: AccessPermissionsFnReturn[T extends ClientGlobalConfig ? 'globals' : 'collections']
) =>
  sections
    .filter((ea) => !ea.slug.startsWith('payload'))
    .filter((ea) => permissions[ea.slug as keyof typeof permissions])
