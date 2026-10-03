import { Button } from '@/components/Button'
import { cn } from '@/lib/cn'
import { Filter } from 'lucide-react'

export const FilterBtn = ({ count, ...props }: Props<'button'> & { count: number }) => {
  return (
    <Button
      {...props}
      // V1's 'default' variant; V2's Button calls the same look 'primary'
      variant='primary'
      className={cn('relative mt-8 mb-4 flex items-center gap-2', props.className)}>
      <Filter className='size-5' />
      <span className='lg:hidden'>Filters ({count})</span>
      <span className='hidden lg:flex'>EXPLORER FILTERS ({count})</span>
    </Button>
  )
}
