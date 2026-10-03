import { listDisabled } from '@/lib/collectionAdminSwitches'
import type { JoinField } from 'payload'

const RouteJoinFieldPath = '@/collections/ContentCollections/Content/_fields/RouteJoin/Field'

export const RouteJoinField: JoinField = {
  type: 'join',
  on: 'doc',
  label: (val) => val.t('general:openInNewWindow'),
  admin: {
    position: 'sidebar',
    condition: (data, _, { operation }) => operation != 'create' && data?.contentType,
    ...listDisabled,
    allowCreate: false,
    defaultColumns: ['url'],
    components: {
      Field: RouteJoinFieldPath,
    },
  },
  collection: 'routes',
  name: 'route',
}
