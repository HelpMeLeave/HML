'use client'

import {
  type CalculateRowLabelProps,
  type StaticeRowLabelProps,
  calculateRow,
} from '@/collections/_labels/RowLabel/rowLabelEl'
import { useRowLabel } from '@payloadcms/ui'
import type { Data } from 'payload'

const RowLabel = ({ style, ...props }: CalculateRowLabelProps | StaticeRowLabelProps) => {
  const { data } = useRowLabel()

  if ('slug' in props) {
    return (
      <span
        style={style}
        className='row-label'>
        {(data as Data)?.[props.slug as keyof Data] ?? props.ifEmpty}
      </span>
    )
  }

  return (
    <span
      style={style}
      className='row-label'>
      {calculateRow[props.calculateKey](data as Data)}
    </span>
  )
}

export default RowLabel
