'use client'

import { Heading } from '@/components/primitives'
import { SubSectionContext } from '@/components/Structure/Subsection/CTX'
import { cn } from '@/lib/cn'
import { ChevronRight } from 'lucide-react'
import { useContext } from 'react'

export const SubsectionHeading = ({ ...props }: Props<'button'>) => {
  const { open, handleToggle } = useContext(SubSectionContext)
  return (
    <Heading
      className={cn(
        'group flex cursor-pointer items-baseline-last text-[2.125rem] leading-normal',
        'mt-[1.25em] mb-[0.25em] not-in-data-open:mb-0 print:break-after-avoid'
      )}
      level={3}
      aria-expanded={open}>
      <button
        type='button'
        {...props}
        className={cn(
          'appearance-none bg-transparent transition-all hover:opacity-75',
          'flex w-full click items-baseline gap-2 focus-visible:outline-0',
          props.className
        )}
        onClick={handleToggle}>
        <span className='relative top-1.25 block'>
          <ChevronRight
            className={cn(
              '',
              'h-[0.7em] w-auto stroke-[1.25px] group-focus-within:stroke-2 group-focus-within:text-accent',
              open && 'text-theme-accent rotate-90'
            )}
          />
        </span>
        <span className='text-start text-[1em]/none *:gap-2 group-focus-within:text-accent max-sm:*:*:first:pr-2 sm:*:flex'>
          {props.children}
        </span>
      </button>
    </Heading>
  )
}
