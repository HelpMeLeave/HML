import type { Flow } from 'payload-workflow'

export const FLOW_STATUSES: Flow.STATUS[] = [
  'wip',
  'submitted',
  'approved',
  'scheduled',
  'published',
  'archived',
  'deleted',
]
