import { FLOW_STATUSES } from '@/_config/plugins/Plugin-Workflow/_lib/constants'
import type { CollectionConfig } from 'payload'
import type {
  FlowLocksAt,
  FlowSTATUS,
  WorkflowCollectionPreprocessedConfig,
} from 'payload-workflow'

export const hasWorkflowConfig = (
  collection: CollectionConfig
): collection is WorkflowCollectionPreprocessedConfig => Boolean(collection.custom?.workflow)

export const isBuilt = (collection: WorkflowCollectionPreprocessedConfig) =>
  Boolean(collection.custom.workflow._init)

export const isFlowStatus = (value: unknown): value is FlowSTATUS =>
  FLOW_STATUSES.some((status) => status === value)

/** True while the document sits at a status the collection declared as locking. A collection with no `locksAt` never locks, which is correct for a flow with no review step. */
export const isLockedAt = ({ locksAt, flow }: { locksAt?: FlowLocksAt; flow: FlowSTATUS }) =>
  Boolean(locksAt) && (Array.isArray(locksAt) ? locksAt : [locksAt!]).includes(flow)
