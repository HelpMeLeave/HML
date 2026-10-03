'use client'

import { PillUserStatus } from '@/components/Admin/Pill/UserStatus'
import { useToolTip } from '@/hooks/useToolTip'
import type { User } from '@/payload-types'

export const Status = ({ status }: { status: User['status'] }) => {
  const { tooltipRef, ToolTip } = useToolTip({ tooltip: status })

  return (
    <span
      className='relative mr-2 flex items-center gap-x-2 overflow-visible pt-1 text-sm font-semibold uppercase'
      ref={tooltipRef}>
      <PillUserStatus
        className=''
        status={status}
      />
      <ToolTip />
    </span>
  )
}
