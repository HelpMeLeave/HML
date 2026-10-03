import CellBase from '@/collections/_lib/CellBase'
import { PillContentType } from '@/components/Admin/Pill/ContentType'
import type { DefaultCellComponentProps } from 'payload'

const ContentTypeCell = (props: DefaultCellComponentProps) => {
  return (
    <CellBase {...props}>
      <PillContentType type={props.cellData} />
    </CellBase>
  )
}

export default ContentTypeCell
