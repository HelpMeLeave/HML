import CellBase from '@/collections/_lib/CellBase'
import { NA } from '@/collections/_lib/NA'
import type { User } from '@/payload-types'
import type { DefaultCellComponentProps, TextFieldClient } from 'payload'

const ListDiscordCell = ({
  ...props
}: DefaultCellComponentProps<TextFieldClient, User['discordHandle']>) => {
  const { discordHandle } = props.rowData
  return discordHandle ?
      <CellBase {...props}>
        <span>@</span>
        <span>{discordHandle}</span>
      </CellBase>
    : <NA />
}

export default ListDiscordCell
