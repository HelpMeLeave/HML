import { cn } from '@/lib/cn'
import Link from 'next/link'
import type { ComponentPropsWithRef } from 'react'

export const Button = <T extends 'link' | 'button' = 'button'>({
  variant = 'primary',
  as,
  ...props
}: tBtnProps<T>) => {
  const classes = cn(
    'relative cursor-pointer rounded-md bg-transparent px-3.5 py-2.5 text-xs leading-4 font-semibold tracking-wide whitespace-nowrap uppercase transition-all duration-300 ease-in-out focus-visible:outline-0 dark:tracking-normal',
    ['primary'].includes(variant)
      && 'bg-brand-red text-white hover:bg-red-700 focus-visible:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 dark:focus-visible:bg-red-900',
    variant == 'secondary' && 'bg-mulberry-800 text-white hover:bg-mulberry-600',
    variant == 'ghost' && 'text-foreground border-0',
    variant == 'muted'
      && 'text-brand-red dark:text-brand-grey hover:bg-mulberry-700/10 dark:bg-mulberry-900 hover:dark:bg-mulberry-700',
    variant == 'wYellow' && [
      'bg-brand-red hover:bg-brand-mulberry',
      'text-white dark:outline-transparent',
      'dark:bg-yellow-800 dark:hover:bg-yellow-900',
      'dark:outline-brand-yellow/30 dark:hover:outline-brand-yellow/10',
    ],
    variant == 'wYellowMuted' && [
      'hover:color-foreground bg-mulberry-50 text-mulberry-500 outline-mulberry-100/70',
      'dark:bg-yellow-300/10 dark:text-yellow-500',
      'ring-zinc-600 hover:saturate-25 dark:outline-transparent',
    ],
    props.className
  )

  if ('href' in props || as == 'link') {
    const linkProps = props as tBtnProps<'link'>
    return (
      <Link
        prefetch={false}
        {...linkProps}
        className={classes}
        href={linkProps.href}>
        <Inner>{props.children}</Inner>
      </Link>
    )
  }
  const buttonProps = props as Props<'button'>

  return (
    <button
      {...buttonProps}
      className={classes}>
      <TouchTarget>
        <Inner>{props.children}</Inner>
      </TouchTarget>
    </button>
  )
}

type tBtnProps<T extends 'button' | 'link'> = {
  variant?: 'primary' | 'secondary' | 'muted' | 'ghost' | 'wYellow' | 'wYellowMuted'
  size?: 'small' | 'medium' | 'large' | 'x-large'
  as?: T
} & tBtnAsProps<T>

type tBtnAsProps<T extends 'button' | 'link'> =
  T extends 'link' ? { href: string } & Omit<Props.Link, 'as' | 'size'>
  : ComponentPropsWithRef<'button'>

const Inner = ({ ...props }: { children: ReactNode }) => {
  return <>{props.children}</>
}

function TouchTarget({
  children,
  ...props
}: {
  children: ReactNode
} & Props) {
  return (
    <>
      <span
        className={cn(
          'absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden',
          props.className
        )}
        aria-hidden='true'
      />
      {children}
    </>
  )
}
