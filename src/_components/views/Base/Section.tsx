import { Table } from '@/_components/views/Dashboard/_components/Table'
import { cn } from '@/lib/cn'

const Section = (props: Props) => {
  return (
    <div
      {...props}
      className={cn(
        'hover:border-input-border-hover w-full rounded-2xl border border-input-border bg-card px-2 shadow-input outline-5 -outline-offset-6 outline-card hover:shadow-input-hover',
        props.className
      )}>
      <div className='overflow-x-auto overflow-y-visible'>{props.children}</div>
    </div>
  )
}

export const TableSection = (props: Props) => {
  return (
    <Section className='max-w-full'>
      <div
        className={cn(
          'dashboard table mb-0! w-full border-0! bg-transparent! px-0! shadow-none!',
          props.className
        )}>
        <Table>{props.children}</Table>
      </div>
    </Section>
  )
}
