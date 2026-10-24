import { Button } from '@/components/Button'
import { Filter } from '@boxicons-pro/react'

export const FilterBtn = ({ count, ...props }: Props<'button'> & { count: number }) => {
  return (
    <Button
      {...props}
      Icon={Filter}
      iconAttributes={{
        pack: 'filled',
      }}
      className={props.className}>
      <span className='lg:hidden'>Filters ({count})</span>
      <span className='max-lg:hidden'>Explorer Filters ({count})</span>
    </Button>
  )
}
