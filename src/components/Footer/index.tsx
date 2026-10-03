'use client'

import { socials } from '@/app/(www)/(Content)/_lib/socials'
import type { tNavFetchCTX } from '@/app/(www)/_providers/_types'
import {
  FooterBottomSection,
  FooterCopywrite,
  FootereSocialLink,
} from '@/components/Footer/FooterBottomSection'
import { FooterLogo, FooterMainSection } from '@/components/Footer/FooterMainSection'
import { FooterNavLink, FooterNavMenu } from '@/components/Footer/FooterNavMenu'

export const Footer = ({ footerLinks, year }: Pick<tNavFetchCTX, 'year' | 'footerLinks'>) => {
  return (
    <footer
      className='dark:border-t-theme-foreground/15 border-t-theme-foreground/5 z-2 mt-(--announcement-offset) min-h-(--footer-min-height) w-full border-t bg-grey-50 from-0% to-90% pt-8 shadow-[0px_-3px_6px_0px_light-dark(rgb(85_85_85/4%),rgb(0_0_0/4%)),0px_-1px_6px_0px_light-dark(rgb(85_85_85/6%),rgb(0_0_0/6%))] in-[body:has(.no-footer)]:hidden dark:bg-linear-to-b dark:from-slate-800 dark:to-slate-900 print:shadow-none'
      style={{
        boxShadow: '',
      }}>
      <div className='mx-auto flex max-w-full flex-col gap-y-8'>
        <FooterMainSection>
          <FooterLogo />
          <FooterNavMenu>
            {footerLinks?.map((item) => {
              return (
                <FooterNavLink
                  key={item.url}
                  {...item}
                />
              )
            })}
          </FooterNavMenu>
        </FooterMainSection>
        <FooterBottomSection>
          <FooterCopywrite year={year} />
          <span className='flex gap-x-6'>
            {socials.map((item) => (
              <FootereSocialLink
                key={item.href}
                item={item}
              />
            ))}
          </span>
        </FooterBottomSection>
      </div>
    </footer>
  )
}
