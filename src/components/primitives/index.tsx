import { cn } from '@/lib/cn'
import type { HeadingVariant } from '@/lib/slots'
import type { ReactNode } from 'react'

export const Bold = ({ children }: { className?: string; children: ReactNode }) => (
  <strong className='strong'>{children}</strong>
)

export const Italic = ({ ...props }: Props<'i' | 'em'>) => (
  <i
    {...props}
    className={cn(
      'font-[450] tracking-wider text-accent-600 saturate-50 dark:text-accent-300',
      props.className
    )}
  />
)

export const P = ({ ...props }: Props<'p'>) => {
  return (
    <p
      data-slot='text'
      {...props}
    />
  )
}

export const Text = ({ ...props }: Props<'p'>) => {
  return (
    <section
      {...props}
      className={cn('text-pretty', props.className)}
    />
  )
}

export const List = ({
  type,
  ...props
}: Props<'ul'> & { type?: 'numbered' | 'checkmark' | '' }) => {
  const className = cn(
    'in-[li]:my-0.5 in-[li]:ps-2!',
    'ml-2 pl-2 *:last:mb-0',
    type === 'numbered' ? 'list-decimal'
    : type == 'checkmark' ? 'list-checkmark ml-0 pl-0'
    : 'list-disc',
    props.className
  )

  if (type === 'numbered') {
    return (
      <ol
        data-slot='list'
        {...props}
        className={className}
      />
    )
  }
  return (
    <ul
      data-slot='list'
      {...props}
      data-list-type={type == 'checkmark' ? 'list-checkmark' : 'disc'}
      className={cn(className, type, props.className)}
    />
  )
}
export const OL = ({ ...props }: Props<typeof List>) => (
  <List
    type='numbered'
    {...props}
  />
)
export const UL = ({ ...props }: Props<typeof List>) => <List {...props} />

/** The level-4 heading look, exported so a higher heading level can borrow it. */
export const h4ClassName = cn(
  'font-header leading-[0.85] text-balance',
  'font-body',
  'peer relative mb-[0.25em] leading-none font-bold text-base uppercase not-first:mt-[1.125em] *:[strong,b]:font-normal dark:*:[strong,b]:font-light'
)

const DEFAULT_VARIANT: Record<number, HeadingVariant | undefined> = {
  1: 'page',
  2: 'section',
  3: 'subsection',
  4: 'minor',
}

export const Heading = ({
  level = 2,
  variant = DEFAULT_VARIANT[level],
  ...props
}: Props.Heading) => {
  const Tag = `h${level}` as const

  const getClassName = (...className: string[]) =>
    cn('font-header leading-[0.85] text-balance', ...className, props.className)

  const className =
    variant == 'page' ? getClassName('text-base')
    : variant == 'section' ?
      getClassName('text-body in-[[data-slot=header]:has([data-slot=eyebrow])]:leading-none')
    : variant == 'subsection' ? getClassName('**:[strong,b]:font-light')
    : variant == 'minor' ? cn(h4ClassName, props.className)
    : props.className

  return (
    <Tag
      {...props}
      data-slot='heading'
      data-variant={variant}
      className={className}
    />
  )
}
