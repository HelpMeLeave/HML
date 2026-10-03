import type { FlowButton, FlowPermissions } from '@/_config/plugins/Plugin-Workflow/_lib/parseFlow'
import { setBaseComponents } from '@/_config/plugins/Plugin-Workflow/collections/baseComponents'
import { setBaseFields } from '@/_config/plugins/Plugin-Workflow/collections/baseFields'
import { setBaseHooks } from '@/_config/plugins/Plugin-Workflow/collections/baseHooks'
import type { WorkflowRecordSlug } from '@/payload-types'
import type { Flow, FlowOption, WorkflowCollection } from 'payload-workflow'

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
  collection: WorkflowCollection.PreprocessedConfig
  baseSlug: string
  recordSlug: WorkflowRecordSlug
  buttons: Record<Flow.STATUS, FlowButton[]>
  initStatus: Flow.STATUS
  permissions: FlowPermissions
  trackedPaths: string[]
  locksAt?: Flow.LocksAt
  statusOptions: FlowOption[]
  pillLabels: Record<Flow.STATUS, string>
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
  return collection as WorkflowCollection.Config
}
