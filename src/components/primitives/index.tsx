import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

export const Bold = ({ children }: { className?: string; children: ReactNode }) => (
  <strong className='strong'>{children}</strong>
)

export const Italic = ({ ...props }: Props<'i' | 'em'>) => (
  <i
    {...props}
    className={cn(
      'font-[450] tracking-wider text-accent-600 saturate-20 dark:text-accent-300',
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
    type === 'numbered' ? 'list-decimal'
    : type == 'checkmark' ? 'list-checkmark'
    : 'list-disc',
    'in-[li]:my-0.5 in-[li]:ps-2!',
    'peer-[h4]:mt-0',
    props.className
  )

  if (type === 'numbered') {
    return (
      <ol
        {...props}
        className={className}
      />
    )
  }
  return (
    <ul
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

export const Heading = ({ level = 2, ...props }: Props.Heading) => {
  if (level == 1) {
    return (
      <h1
        {...props}
        className={cn('font-header leading-[0.85] font-normal', props.className)}
        data-slot='heading-text'
      />
    )
  }
  if (level == 2) {
    return (
      <h2
        {...props}
        className={cn('font-header leading-[0.85] font-normal text-inherit', props.className)}
        data-slot='heading-text'
      />
    )
  }
  if (level == 3) {
    return (
      <h3
        {...props}
        className={cn(
          'font-header leading-[0.85] font-normal',
          'text-3xl **:[strong,b]:align-middle **:[strong,b]:font-body **:[strong,b]:font-light',
          props.className
        )}
        data-slot='heading-text'
      />
    )
  }
  if (level == 4) {
    return (
      <h4
        {...props}
        className={cn(
          'peer relative mb-1 leading-none font-bold text-base uppercase not-first:mt-[1.125em] has-[+:is(ol,ul,p:has(+ol),p:has(+ul))]:mb-[0.2em] *:[strong,b]:font-normal dark:*:[strong,b]:font-light',
          props.className
        )}
        data-slot='heading-text'>
        {props.children}
      </h4>
    )
  }
  if (level == 5) {
    return (
      <h5
        {...props}
        data-slot='heading-text'
      />
    )
  }
  return (
    <h6
      {...props}
      data-slot='heading-text'
    />
  )
}
