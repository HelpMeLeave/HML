import { P } from '@/components/primitives'
import { linkClassName } from '@/components/primitives/Link'
import { cn } from '@/lib/cn'
import Link from 'next/link'
import type { ElementType } from 'react'

export const CardMeta = ({ ...props }: Props) => {
  return (
    <div
      {...props}
      className='mb-2 flex items-center justify-between'
    />
  )
}

export const CardBody = (props: Props & { as?: ElementType }) => {
  const El = props.as ?? P
  return (
    <El
      {...props}
      className={cn(
        'mt-1 line-clamp-3 text-sm/5 font-normal text-muted italic dark:text-gray-400',
        props.className
      )}
    />
  )
}

export const CardTitle = ({ ...props }: Props) => (
  <span
    data-slot='heading'
    {...props}
    className={cn(linkClassName, props.className)}
  />
)

export const CardFooter = (props: Props) => (
  <P
    {...props}
    className={cn('mt-2 text-xs text-body/50 dark:text-gray-500', props.className)}
  />
)

export const Card = <E extends ElementType = 'div'>({ as, ...props }: { as?: E } & Props<E>) => {
  if (as == 'a')
    return (
      <Link
        {...(props as unknown as Props<typeof Link>)}
        prefetch={false}
        rel='noopener noreferrer'
        className={cn('interactive', 'card', props.className)}>
        <div id='cardWrapper'>{props.children}</div>
      </Link>
    )
  const El = as ?? ('div' as ElementType)

  return (
    <El
      {...(props as unknown as Props<E>)}
      className={cn('interactive', 'card', props.className)}>
      <div id='cardWrapper'>{props.children}</div>
    </El>
  )
}
