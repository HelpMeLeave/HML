import { cn } from '@/lib/cn'

export const Table = ({ ...props }: Props<'table'>) => (
  <table
    className='w-full max-w-full overflow-hidden'
    {...props}
  />
)

export const TableHead = ({ ...props }: Props<'tr'>) => (
  <thead>
    <tr
      {...props}
      className={cn('text-slate-500 *:text-nowrap', props.className)}
    />
  </thead>
)

export { TableCell } from './TableCell'
