import { CellLink } from '@/collections/_lib/CellLink'
import { NA } from '@/collections/_lib/NA'
import { normalizeAdminPath } from '@/lib/normalize'
import type { DefaultCellComponentProps } from 'payload'
import type { FieldAdmin } from 'payload-types'

type ElProps = DefaultCellComponentProps & {
  children?: ReactNode
  style?: FieldAdmin['style']
  className?: FieldAdmin['className']
}

const Inner = (props: ElProps) => {
  if (props.children) return props.children
  // 0 is a value, not an empty cell
  if (props.cellData || props.cellData === 0) return props.cellData
  return <NA />
}

const CellBase = (props: ElProps) => {
  const { link, linkURL, style, className } = props
  const adminLink = normalizeAdminPath(['collections', props.collectionSlug, props.rowData.id])

  return link ?
      <CellLink
        style={style}
        className={className}
        href={linkURL ?? adminLink}
        collectionSlug={props.collectionSlug}
        rowData={props.rowData}>
        <Inner {...props} />
      </CellLink>
    : <span
        style={{
          ...style,
        }}
        className={className}>
        <Inner {...props} />
      </span>
}

export default CellBase
