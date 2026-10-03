import { Pill } from '@/components/Admin/Pill'
import type { User } from '@/payload-types'
import type { PillColors } from './_types'

export const PillUserStatus = ({
  status,
  children,
  className,
}: Props<'span'> & {
  status: User['status']
}) => {
  return (
    <Pill
      className={className}
      statusOpts={
        {
          pending: 'purple',
          hiatus: 'orange',
          inactive: 'red',
          active: 'green',
        } as Record<User['status'], PillColors>
      }
      status={status ?? 'pending'}>
      {children ?? status}
    </Pill>
  )
}
