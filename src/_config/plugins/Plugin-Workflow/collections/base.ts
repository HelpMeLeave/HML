import type { FlowButton, FlowPermissions } from '@/_config/plugins/Plugin-Workflow/_lib/parseFlow'
import { setBaseComponents } from '@/_config/plugins/Plugin-Workflow/collections/baseComponents'
import { setBaseFields } from '@/_config/plugins/Plugin-Workflow/collections/baseFields'
import { setBaseHooks } from '@/_config/plugins/Plugin-Workflow/collections/baseHooks'
import type { WorkflowRecordSlug } from '@/payload-types'
import type {
  FlowLocksAt,
  FlowOption,
  FlowSTATUS,
  WorkflowCollectionConfig,
  WorkflowCollectionPreprocessedConfig,
} from 'payload-workflow'

export const setBase = ({
  collection,
  baseSlug,
  recordSlug,
  buttons,
  initStatus,
  permissions,
  trackedPaths,
  locksAt,
  statusOptions,
  pillLabels,
  hasSidebarFields,
}: {
  collection: WorkflowCollectionPreprocessedConfig
  baseSlug: string
  recordSlug: WorkflowRecordSlug
  buttons: Record<FlowSTATUS, FlowButton[]>
  initStatus: FlowSTATUS
  permissions: FlowPermissions
  trackedPaths: string[]
  locksAt?: FlowLocksAt
  statusOptions: FlowOption[]
  pillLabels: Record<FlowSTATUS, string>
  hasSidebarFields: boolean[]
}) => {
  setBaseComponents({
    collection,
    buttons,
    locksAt,
    pillLabels,
  })

  setBaseFields({
    collection,
    initStatus,
    statusOptions,
    recordSlug,
    hasSidebarFields,
  })

  setBaseHooks({
    collection,
    baseSlug,
    recordSlug,
    buttons,
    initStatus,
    permissions,
    trackedPaths,
    locksAt,
  })
  return collection as WorkflowCollectionConfig
}
