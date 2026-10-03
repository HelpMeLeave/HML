import { cn } from '@/lib/cn'
import type { ElementType } from 'react'

export const Eyebrow = ({ as: _as, ...props }: Props<'p'> & { as?: ElementType }) => {
  return (
    props.children && (
      <p
        data-slot='eyebrow'
        {...props}
        className={cn(
          'my-0 flex items-center font-mono text-sm/8 font-normal tracking-[1.4] uppercase',
          props.className
        )}
      />
    )
  )
}
