import { cn } from '@/lib/cn'
import type { JSX } from 'react'

export const Subtitle = ({
  as,
  ...props
}: Props<'p'> & {
  as?: JSX.ElementType
}) => {
  const El = as ?? 'p'
  return (
    <El
      {...props}
      className={cn(
        'font-body text-[0.3em] leading-relaxed font-light tracking-[0.1ch] text-balance text-muted/80 *:[strong,b]:font-normal dark:*:[strong,b]:font-light',
        props.className
      )}
      data-slot='subtitle'
    />
  )
}
