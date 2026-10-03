import { TableSection } from '@/_components/views/Base/Section'
import { ToggleSection } from '@/_components/views/Base/ToggleSection'
import type { SanitizedPermissions } from 'payload'
import type { ReactElement } from 'react'

export const RecentTable = ({
  data,
  title,
  Head,
  Row,
  permissions,
  className,
}: {
  data: {
    [key: string]: AnySafe
    id: string | number
  }[]
  title: string
  Row: (data: AnySafe) => ReactNode
  Head: ReactElement
  permissions: SanitizedPermissions
  className?: Props['className']
}) => {
  return (
    <ToggleSection
      className={className}
      headingText={title}>
      {data?.length > 0 ?
        <TableSection>
          {Head}
          <tbody>
            {data?.map((ea) => (
              <Row
                permissions={permissions}
                key={ea.id}
                {...ea}
              />
            ))}
          </tbody>
        </TableSection>
      : <h3 className='px-4 font-[350]! text-accent/50'>No Data Available</h3>}
    </ToggleSection>
  )
}
