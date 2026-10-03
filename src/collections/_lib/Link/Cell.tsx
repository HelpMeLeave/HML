import CellBase from '@/collections/_lib/CellBase'
import { CellWrapper } from '@/collections/_lib/IconFieldWrappers'
import { NA } from '@/collections/_lib/NA'
import { Globe } from 'lucide-react'
import type { DefaultCellComponentProps } from 'payload'

const LinkIconCell = ({
  ...props
}: DefaultCellComponentProps & {
  children: ReactNode
}) => {
  return props.cellData ?
      <CellBase {...props}>
        <CellWrapper Icon={Globe}>{props.cellData}</CellWrapper>
      </CellBase>
    : <NA />
}

export default LinkIconCell
