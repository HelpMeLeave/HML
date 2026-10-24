import { cn } from '@/lib/cn'

export const TouchTarget = ({
  children,
  as,
  ...props
}: {
  children: ReactNode
  as: 'link' | 'button'
} & Props) => (
  <>
    {as == 'button' && (
      <span
        className={cn(
          'absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden',
          props.className
        )}
        aria-hidden='true'
      />
    )}
    {children}
  </>
)
