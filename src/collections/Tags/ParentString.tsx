import { toTitleCase } from '@/lib/textCasing'
import { Link } from '@payloadcms/ui'
import type { DefaultCellComponentProps } from 'payload'

const withTitle = (tag?: string) => {
  if (tag && typeof tag == 'string') {
    return toTitleCase(
      tag
        .split('')
        .map((t) => (t == t.toUpperCase() ? ` ${t}` : t))
        .join('')
    )
  } else return '-'
}

export const ParentStringCell = (props: DefaultCellComponentProps) => {
  return (
    <>
      {props.rowData?.parentTitle.map((ea: string) => {
        return (
          <Link
            prefetch={false}

            key={ea}
            href={`${ea}`}>
            <span>{withTitle(ea)}</span>
          </Link>
        )
      }) ?? '-'}
    </>
  )
}
