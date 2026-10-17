import type { FlowSTATUS } from 'payload-workflow'

export const FLOW_STATUSES: FlowSTATUS[] = [
  'wip',
  'submitted',
  'approved',
  'scheduled',
  'published',
  'archived',
  'deleted',
]
