import { cn } from '@/lib/cn'
import { isHeadingLink } from '@/lib/normalize/isHeadingLink'
import { isOffSite } from '@/lib/normalize/isOffSite'
import NextLink from 'next/link'
import type React from 'react'

export const linkClassName =
  'font-semibold underline decoration-accent/50 decoration-[1.75px] underline-offset-2 hocus:decoration-accent hocus:decoration-1'

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
}) => (
  <NextLink
    {...props}
    prefetch={false}
    className={cn(props.className)}>
    {props.children}
  </NextLink>
)

/** props - @see {@link NextLink NextJS Link Props} for prop options*/
export const InlineLink = ({
  href,
  ...props
}: Props<typeof Link> & {
  href: string | URL
  ref?: React.ForwardedRef<HTMLAnchorElement>
}) => (
  <Link
    href={href}
    {...props}
    className={cn(
      linkClassName,
      'in-slot-subsection-heading:font-[450] in-slot-subsection-heading:decoration-accent/80 in-slot-subsection-heading:decoration-[0.08em] in-slot-subsection-heading:underline-offset-[0.12em] in-slot-subsection-heading:hocus:decoration-[0.08em]',
      props.className
    )}
    target={(() => {
      const url = String(href).toLowerCase()

      if (isHeadingLink(url)) return undefined
      if (props.target) return props.target
      if (url.endsWith('.pdf') || isOffSite(url)) return '_blank'
      return '_self'
    })()}
    prefetch={false}
  />
)
