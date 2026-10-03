import { cn } from '@/lib/cn'
import { isOffSite } from '@/lib/normalize/resolveLink'
import NextLink from 'next/link'
import type React from 'react'

/**
 * props - Additional properties to apply to the link.
 * @see {@link NextLink NextJS Link Props} for prop options
 *
 * size - The size of the link, can be 'sm', 'md', or 'lg'.
 * @default `true` (pages router) or `null` (app router)
 */
export const Link = ({
  ...props
}: Props<typeof NextLink> & {
  ref?: React.ForwardedRef<HTMLAnchorElement>
}) => {
  return (
    <NextLink
      {...props}
      prefetch={false}
      className={cn(props.className)}>
      {props.children}
    </NextLink>
  )
}

/** props - @see {@link NextLink NextJS Link Props} for prop options*/
export const InlineLink = ({
  href,
  ...props
}: Props<typeof Link> & {
  href: string | URL
  ref?: React.ForwardedRef<HTMLAnchorElement>
}) => {
  const target = () => {
    if (String(href).toLowerCase().endsWith('.pdf')) return '_blank'
    return isOffSite(String(href)) ? '_blank' : '_self'
  }
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        'font-semibold underline decoration-accent/50 decoration-[1.75px] underline-offset-2 hocus:decoration-accent hocus:decoration-1',
        props.className
      )}
      target={String(href)?.[0] != '#' ? (props.target ?? target()) : undefined}
      prefetch={false}
    />
  )
}
