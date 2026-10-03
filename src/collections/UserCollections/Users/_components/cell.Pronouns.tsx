import CellBase from '@/collections/_lib/CellBase'
import { toTitleCase } from '@/lib/textCasing'
import type { User } from '@/payload-types'
import type { DefaultCellComponentProps, TextFieldClient } from 'payload'

const ListPronounsCell = (props: DefaultCellComponentProps<TextFieldClient, User['pronouns']>) => (
  <CellBase {...props}>
    {(props.cellData as string[])?.map((data) => toTitleCase(data)).join('/')}
  </CellBase>
)

export default ListPronounsCell
