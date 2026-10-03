import CellBase from '@/collections/_lib/CellBase'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import type { DefaultCellComponentProps } from 'payload'

const TitleCell = (props: DefaultCellComponentProps) => {
  return (
    <CellBase {...props}>
      {typeof props.cellData == 'object' ?
        convertLexicalToPlaintext(props.cellData)
      : props.cellData}
    </CellBase>
  )
}

export default TitleCell
