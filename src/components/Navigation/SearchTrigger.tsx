'use client'

import { cn } from '@/lib/cn'
import { Search } from 'lucide-react'

export const SearchTrigger = ({
  variant = 'bar',
  onClick,
}: Pick<Props<'button'>, 'onClick'> & {
  variant?: 'bar' | 'sheet'
  onClick?: () => void
}) =>
  variant == 'sheet' ?
    <button
      type='button'
      onClick={onClick}
      className='mb-7 flex w-full click items-center gap-3 rounded-xl border border-hr-muted bg-card px-3.5 py-2 text-left text-[0.95rem] text-muted'>
      <Search
        aria-hidden
        className='size-4'
      />
      Search Help Me Leave
    </button>
  : <button
      type='button'
      onClick={onClick}
      aria-label='Search'
      className={cn(
        'flex w-full max-w-2xs click items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-body',
        'h-full px-0 max-xl:w-14 max-xl:justify-center xl:px-6'
      )}>
      <span className='flex h-8 flex-1 items-center gap-2.5 rounded-lg border border-input-border bg-input-bg px-3'>
        <Search
          aria-hidden
          className='size-3 text-muted'
        />
        <span className='font-light tracking-widest uppercase max-xl:hidden'>Search</span>
      </span>
      <kbd className='rounded-sm border border-input-border px-1.5 py-0.5 font-sans text-[0.625rem] font-bold tracking-wider text-input-border max-xl:hidden'>
        /
      </kbd>
    </button>
