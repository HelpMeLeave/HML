import type { PillColors } from '@/components/Admin/Pill/_types'
import type { Flow } from 'payload-workflow'

export const pillColors: Record<Flow.STATUS, PillColors> = {
  wip: 'pink',
  submitted: 'blue',
  approved: 'purple',
  scheduled: 'yellow',
  published: 'lime',
  archived: 'orange',
  deleted: 'red',
}
