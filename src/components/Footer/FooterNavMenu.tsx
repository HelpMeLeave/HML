'use client'
import { InlineLink } from '@/components/primitives/Link'
import { isOffSite } from '@/lib/normalize/resolveLink'
import type { NavigationGroup } from 'www/_providers/_types'

export const FooterNavMenu = ({ children }: Props) => (
  <nav className='flex w-full justify-evenly gap-16 text-center md:mt-16'>
    <menu
      // prose prose-theme prose-li:my-0 prose-li:py-0 prose-a:text-initial
      className='grid w-full grid-flow-row-dense grid-cols-2 justify-evenly space-y-1'>
      {children}
    </menu>
  </nav>
)

export const FooterNavLink = (item: NavigationGroup) => {
  return (
    <li key={item.displayText}>
      <InlineLink
        target={item.type == 'external' ? '_blank' : '_self'}
        href={item.url}
        data-external={isOffSite(item.url) ? '' : undefined}
        className='block h-full min-h-[2lh] w-full content-center text-xs font-medium uppercase decoration-transparent transition-all'>
        {item.displayText}
      </InlineLink>
    </li>
  )
}
