import FlowPill from '@/_config/plugins/Plugin-Workflow/_components/Pill'
import CellBase from '@/collections/_lib/CellBase'
import type { DefaultCellComponentProps } from 'payload'

const PillCell = ({ ...props }: DefaultCellComponentProps) => (
  <CellBase {...props}>
    <FlowPill
      pillStyles={{
        marginInline: 'auto',
      }}
      status={props.cellData}
    />
  </CellBase>
)

export default PillCell
