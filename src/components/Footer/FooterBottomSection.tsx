'use client'

import { isOffSite } from '@/lib/normalize/resolveLink'
import Link from 'next/link'
import type { Social } from 'www/(Content)/_lib/socials'
import type { NavigationGroup } from 'www/_providers/_types'

export const FooterBottomSection = ({ children }: Props) => {
  return (
    <span className='bg-theme-card flex items-center justify-between p-6 text-brand-mulberry italic dark:bg-transparent dark:text-brand-yellow'>
      {children}
    </span>
  )
}

export function FooterCopywrite({ year }: { year?: number }) {
  return (
    <small className='flex grow flex-wrap justify-center gap-x-2 text-center text-xs/6'>
      {year && (
        <>
          <span>&copy; {year} Help Me Leave.</span> <span>All rights reserved.</span>
        </>
      )}
    </small>
  )
}

export const FootereSocialLink = ({
  item,
  links,
}: {
  item: Social
  links?: Record<string, NavigationGroup | undefined>
}) => (
  <Link
    prefetch={false}
    key={item.name}
    id={`socials-${item.name}`}
    data-external={isOffSite(item.href) ?? undefined}
    href={links && item.name in links ? links[item.name]?.url : item.href}>
    <span className='sr-only'>{item.name}</span>
    <item.type
      className='size-6'
      style={{
        color: item.color,
      }}
      aria-hidden='true'
    />
  </Link>
)
