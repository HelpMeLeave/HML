import { FLOW_STATUSES } from '@/_config/plugins/Plugin-Workflow/_lib/constants'
import type { CollectionConfig } from 'payload'
import type { Flow, WorkflowCollection } from 'payload-workflow'

export const hasWorkflowConfig = (
  collection: CollectionConfig
): collection is WorkflowCollection.PreprocessedConfig => Boolean(collection.custom?.workflow)

export const isBuilt = (collection: WorkflowCollection.PreprocessedConfig) =>
  Boolean(collection.custom.workflow._init)

export const isFlowStatus = (value: unknown): value is Flow.STATUS =>
  FLOW_STATUSES.some((status) => status === value)

/** True while the document sits at a status the collection declared as locking. A collection with no `locksAt` never locks, which is correct for a flow with no review step. */
export const isLockedAt = ({ locksAt, flow }: { locksAt?: Flow.LocksAt; flow: Flow.STATUS }) =>
  Boolean(locksAt) && (Array.isArray(locksAt) ? locksAt : [locksAt!]).includes(flow)
