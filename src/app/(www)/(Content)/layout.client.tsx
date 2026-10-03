'use client'

import { AnnouncementInnerWrapper } from '@/components/Announcement/index.client'
import { Footer } from '@/components/Footer'
import { SiteHeader } from '@/components/Navigation/SiteHeader'
import { cn } from '@/lib/cn'
import { DateTime } from 'luxon'
import { useContext } from 'react'
import { NavCTX } from 'www/_providers/CTX'

export const LayoutWrapper = ({ children }: Props) => {
  const { topNav, footerLinks, banner } = useContext(NavCTX)

  return (
    <>
      <SiteHeader topNav={topNav} />
      {children}
      <div
        data-slot='announcement'
        className={cn(
          'sticky bottom-0 z-20 mt-(--announcement-offset) -mb-(--announcement-offset-b) h-(--announcement-height) w-full in-[body:has(.no-footer)]:hidden has-[data-show]:print:hidden'
        )}>
        <AnnouncementInnerWrapper banner={banner} />
      </div>
      <Footer
        footerLinks={footerLinks}
        year={DateTime.now().year}
      />
    </>
  )
}
