import { cn } from '@/lib/cn'
import type { ElementType } from 'react'

export const browClassname =
  'my-0 flex items-center font-mono text-xs/7 font-normal tracking-[1.4] uppercase node-empty-content:[content:attr(data-placeholder)] italic **:not-italic *:[a]:text-body not-in-data-cover:text-accent-muted dark:not-in-data-cover:text-accent'

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
