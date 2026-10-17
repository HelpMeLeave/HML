import type { PillColors } from '@/components/Admin/Pill/_types'
import type { FlowSTATUS } from 'payload-workflow'

export const pillColors: Record<FlowSTATUS, PillColors> = {
  wip: 'pink',
  submitted: 'blue',
  approved: 'purple',
  scheduled: 'yellow',
  published: 'lime',
  archived: 'orange',
  deleted: 'red',
}
