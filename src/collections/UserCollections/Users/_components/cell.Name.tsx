import CellBase from '@/collections/_lib/CellBase'
import { toTitleCase } from '@/lib/textCasing'
import type { User } from '@/payload-types'
import type { DefaultCellComponentProps, TextFieldClient } from 'payload'

const ListNameCell = (props: DefaultCellComponentProps<TextFieldClient, User['username']>) => {
  const { firstName, username } = props.rowData
  return <CellBase {...props}>{toTitleCase(firstName ?? username)}</CellBase>
}

export default ListNameCell
