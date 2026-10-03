'use client'

import { cn } from '@/lib/cn'
import { Link, useListDrawerContext } from '@payloadcms/ui'
import type { CollectionSlug, DefaultCellComponentProps } from 'payload'
import type { FieldAdmin } from 'payload-types'

// Client half of CellBase: only the client can tell whether the table sits inside a list drawer
export const CellLink = ({
  href,
  collectionSlug,
  rowData,
  style,
  className,
  children,
}: {
  href: string
  collectionSlug: CollectionSlug
  rowData: DefaultCellComponentProps['rowData']
  style?: FieldAdmin['style']
  className?: FieldAdmin['className']
  children: ReactNode
}) => {
  const { drawerSlug, onSelect } = useListDrawerContext()

  // Payload only sets `link` on the first visible column, so this is always the row's first cell; in a drawer it picks the row instead of navigating, like Payload's own cells
  if (drawerSlug) {
    return (
      <button
        type='button'
        style={style}
        className={cn('btn btn--style-none btn--no-margin default-cell__first-cell', className)}
        onClick={() => onSelect?.({ collectionSlug, doc: rowData, docID: rowData.id })}>
        {children}
      </button>
    )
  }

  return (
    <Link
      style={style}
      className={className}
      prefetch={false}
      href={href}>
      {children}
    </Link>
  )
}
