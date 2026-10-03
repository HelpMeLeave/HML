import CellBase from '@/collections/_lib/CellBase'
import { NA } from '@/collections/_lib/NA'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import type { DefaultCellComponentProps, RichTextFieldClient } from 'payload'

const RichTextFieldCell = (props: DefaultCellComponentProps<RichTextFieldClient>) => {
  if (props.cellData) {
    props = {
      ...props,
      className: [props.className, 'rich-text'].filter(Boolean).join(' '),
      cellData: convertLexicalToPlaintext({ data: props.cellData }),
    }
    return <CellBase {...props} />
  }
  return <NA />
}

export default RichTextFieldCell
