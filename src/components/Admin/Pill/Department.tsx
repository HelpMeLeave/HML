import { Pill } from '@/components/Admin/Pill'
import type { PillarNames } from '@/lib/constants/PILLARS'
import type { PillColors } from './_types'

export const PillDepartment = ({
  children,
  className,
  dept,
}: {
  dept: PillarNames
  children?: string
  className?: Props['className']
}) => {
  return (
    dept && (
      <Pill
        className={className}
        statusOpts={
          {
            'Community Intelligence & Impact': 'orange',
            Support: 'yellow',
            Strategy: 'lime',
            Operations: 'blue',
            Marketing: 'purple',
            Tech: 'pink',
          } as Record<PillarNames, PillColors>
        }
        status={dept}>
        {children ?? dept}
      </Pill>
    )
  )
}
