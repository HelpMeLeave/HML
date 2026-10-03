import { cn } from '@/lib/cn'
import { CheckboxInput, Link } from '@payloadcms/ui'
import { DateTime } from 'luxon'

type CellType = 'link' | 'number' | 'checkbox' | 'default' | 'date'
type BaseCellProps = Props<'td'>
type CellProps<T extends CellType> =
  T extends 'link' ? CellLinkProps & BaseCellProps
  : T extends 'date' ? CellDateProps & BaseCellProps
  : T extends 'checkbox' ? CellCBProps & BaseCellProps
  : T extends 'default' ? BaseCellProps
  : never

type CellLinkProps = {
  href: Props<'a'>['href']
  target: Props<'a'>['target']
  children: ReactNode
  accessAllowed: boolean
}
const LinkCell = ({ href, target, children, accessAllowed }: CellLinkProps) =>
  accessAllowed ?
    <Link
      prefetch={false}
      className='underline decoration-1'
      href={href}
      target={target}>
      {children}
    </Link>
  : <span>{children}</span>

type CellDateProps = Exclude<Props<'td'>, 'children'> & {
  type: 'date'
  date: string | DateTime
}
const DateCell = ({ date }: { date?: DateTime | string }) => {
  return (
    date && (
      <span className='text-sm italic'>
        {typeof date == 'string' ?
          DateTime.fromISO(date).toFormat('LLL dd, yyyy')
        : date.toFormat('LLL dd, yyyy')}
      </span>
    )
  )
}

type CellCBProps = Props<typeof CheckboxInput> & {
  type: 'checkbox'
  label: string
}
const CheckboxCell = ({ ...props }: CellCBProps) => {
  return (
    <>
      <CheckboxInput
        {...props}
        className='label:sr-only'
      />
    </>
  )
}

const TableCellWrapper = ({ ...props }: Props<'td'>) => {
  return (
    <td
      {...props}
      className={cn(
        'overflow-hidden text-nowrap text-ellipsis',
        'has-[input]:w-min',
        props.className
      )}
    />
  )
}
export const TableCell = <T extends CellType>({ ...props }: { type?: T } & CellProps<T>) => {
  const { type, ...rest } = props
  if (type == 'date' && 'date' in props) {
    return (
      <TableCellWrapper {...rest}>
        <DateCell date={props.date} />
      </TableCellWrapper>
    )
  }
  if (type == 'link') {
    const { href, target, children, accessAllowed, ...cellProps } =
      rest as unknown as CellProps<'link'>
    return (
      <TableCellWrapper {...cellProps}>
        <LinkCell
          accessAllowed={accessAllowed}
          href={href}
          target={target ?? '_self'}>
          {children}
        </LinkCell>
      </TableCellWrapper>
    )
  }

  if (type == 'checkbox') {
    const { checked, onToggle, label, ...cellProps } = rest as unknown as CellProps<'checkbox'>
    return (
      <TableCellWrapper {...cellProps}>
        <CheckboxCell
          label={label}
          checked={checked}
          onToggle={onToggle}
          type={'checkbox'}
        />
      </TableCellWrapper>
    )
  }

  return <TableCellWrapper {...rest} />
}
