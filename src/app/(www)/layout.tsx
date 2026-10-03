import { getNavigation } from '@/app/(www)/_providers/Navigation/qry.server'
import { Body } from '@/components/Structure/Body'
import { env } from '@/env'
import { cn } from '@/lib/cn'
import { atkinsonFont, atkinsonMonoFont, bebasNeue, interstateFont } from '@/lib/fonts'
import '@/styles/style.css'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import 'react'
import { Providers } from 'www/_providers'

export const metadata: Metadata = {
  title: {
    template: '%s | HML',
    default: 'Help Me Leave',
  },
  publisher: 'Help Me Leave',
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
}

const Layout = async ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const useAnalytics = env.NODE_ENV == 'production'
  const navFetch = await getNavigation()

  return (
    <html
      suppressHydrationWarning={true}
      data-scroll-behavior='smooth'
      lang='eng'
      className={cn(
        atkinsonFont.variable,
        atkinsonMonoFont.variable,
        bebasNeue.variable,
        interstateFont.variable,
        'scroll-pt-[calc(var(--nav-height)+1.5rem)] scroll-smooth'
      )}>
      <Body>
        <Providers nav={navFetch}>{children}</Providers>
        {useAnalytics && <Analytics />}
      </Body>
    </html>
  )
}

export default Layout
