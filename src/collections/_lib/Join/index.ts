import type { CollectionSlug, JoinField } from 'payload'
import type { Collection } from 'payload-types'

type OmittedAdmin = 'allowCreate' | 'defaultColumns' | 'position' | 'description'
type Omitted = 'name' | 'type' | 'collection' | 'on'
type JoinConfigOpts = Omit<JoinField, Omitted> & Pick<Valid<JoinField['admin']>, OmittedAdmin>

export const JoinConfig = <T extends CollectionSlug>(
  name: string,
  collection: T,
  on: keyof Collection<T> & string,
  opts?: JoinConfigOpts
): JoinField => {
  const { allowCreate, defaultColumns, position, description, ...otherOpts } = opts ?? {}
  return {
    name,
    type: 'join',
    collection,
    on,
    ...otherOpts,
    admin: {
      ...otherOpts.admin,
      description,
      allowCreate,
      defaultColumns,
      position,
    },
  }
}
