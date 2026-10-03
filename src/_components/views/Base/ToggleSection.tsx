'use client'

import { cn } from '@/lib/cn'
import { toCamelCase } from '@/lib/textCasing'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

export const ToggleSection = ({ headingText, ...props }: { headingText: string } & Props) => {
  const [open, setOpen] = useState(false)
  const controller = toCamelCase(headingText)

  return (
    <div
      id={controller}
      aria-expanded={open}
      className={cn(
        open ? 'mb-8 h-full flex-1 basis-64' : 'mb-0 basis-full',
        'flex h-min max-h-min w-full flex-col gap-2 transition-all',
        props.className
      )}>
      <h2
        aria-controls={controller}
        role='button'
        className='flex cursor-pointer items-center gap-x-4'
        onClick={() => setOpen((prev) => !prev)}>
        <ChevronRight
          strokeWidth={3}
          className={cn(open ? 'rotate-90' : 'rotate-0', 'size-6! transition-transform')}
        />{' '}
        {headingText}
      </h2>
      {open && props.children}
    </div>
  )
}
