import { type PillColors } from './_types'
import './style.scss'

export const Pill = ({
  statusOpts,
  status,
  children,
  style,
}: Props<'span'> & {
  statusOpts: Record<string, PillColors>
  status: string
}) => {
  return (
    <span
      data-status={status}
      style={{
        borderRadius: '6px',
        ...style,
      }}
      className={`pill pill--size-small pill--style-inline pill--style-inline__${statusOpts[status as keyof typeof statusOpts]}`}>
      {children ?? status}
    </span>
  )
}
