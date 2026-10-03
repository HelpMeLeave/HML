import { Pill } from '@/components/Admin/Pill'
import type { Content, Pathway } from '@/payload-types'

export const PillWorkflowStatus = ({ type }: { type: Pathway['flow'] | Content['flow'] }) => {
  return (
    <Pill
      statusOpts={{
        published: 'blue',
        init: 'red',
        scheduled: 'purple',
        submitted: 'yellow',
      }}
      status={type ?? 'draft'}
    />
  )
}
