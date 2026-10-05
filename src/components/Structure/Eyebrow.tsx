import { cn } from '@/lib/cn'
import type { ElementType } from 'react'

export const browClassname =
  'my-0 flex items-center font-mono text-sm/8 font-normal tracking-[1.4] uppercase has-[br:first-child:last-child]:[before]:[content:attr(data-placeholder)]'

export const Eyebrow = ({ as: _as, ...props }: Props<'p'> & { as?: ElementType }) => {
  return (
    props.children && (
      <p
        data-slot='eyebrow'
        {...props}
        className={cn(browClassname, props.className)}
      />
    )
  )
}
