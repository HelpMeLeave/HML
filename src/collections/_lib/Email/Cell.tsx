import CellBase from '@/collections/_lib/CellBase'
import { MailToDrawer } from '@/collections/_lib/Email/Cell.client'
import { NA } from '@/collections/_lib/NA'
import type { DefaultCellComponentProps } from 'payload'

const AsLink = (props: DefaultCellComponentProps & { children: ReactNode }) => {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        maxWidth: 'min-content',
      }}>
      <MailToDrawer id={props.rowData.id}>{props.children}</MailToDrawer>
      {!props.children && <CellBase {...props}>{props.cellData}</CellBase>}
    </span>
  )
}

const EmailCell = (props: DefaultCellComponentProps & { children: ReactNode }) => {
  if (props.cellData) {
    return props.link ? <AsLink {...props} /> : <AsLink {...props}>{props.cellData}</AsLink>
  }
  return <NA />
}

export default EmailCell
