import { SidebarToggleClient } from '@/_components/views/SidebarToggle/Component.client'
import type { User } from '@/payload-types'
import type { I18n } from '@payloadcms/translations'
import type {
  BasePayload,
  DocumentSubViewTypes,
  PayloadRequest,
  Permissions,
  ViewTypes,
  VisibleEntities,
} from 'payload'
import type { ParamSegments } from 'payload-types'

const SidebarToggle = ({
  collectionSlug,
  payload,
  viewType,
}: {
  collectionSlug: string
  docID: number
  documentSubViewType: DocumentSubViewTypes
  i18n: I18n
  params: ParamSegments
  payload: BasePayload
  permissions: Permissions
  user: User | null
  viewType: ViewTypes
  visibleEntities: VisibleEntities
  req: PayloadRequest
}) => {
  const sidebarCollections = (payload.config.custom?.sidebarCollections as string[]) ?? []

  if (
    (collectionSlug && sidebarCollections.includes(collectionSlug))
    || (viewType == 'account' && sidebarCollections.includes('users'))
  ) {
    return <SidebarToggleClient />
  }
}

export default SidebarToggle
