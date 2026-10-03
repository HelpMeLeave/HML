import { LayoutWrapper } from '@/app/(www)/(Content)/layout.client'
import { cn } from '@/lib/cn'

const Layout = async ({ children }: LayoutProps<'/'>) => (
  <LayoutWrapper>
    <main
      className={cn(
        'relative grid',
        'grid-cols-[minmax(1rem,1fr)_minmax(0,var(--measure))_minmax(1rem,1fr)]',
        'sm:grid-cols-[minmax(1.5rem,1fr)_minmax(0,var(--measure))_minmax(1.5rem,1fr)]',
        'xl:grid-cols-[1fr_190px_64px_minmax(0,var(--measure))_56px_300px_1fr]',
        'md:has-data-[layout="half"]:grid-cols-[minmax(48px,auto)_minmax(1px,400px)_24px_minmax(1px,600px)_minmax(48px,auto)]',
        'h-full',
        'min-h-[calc(100vh-var(--nav-height)-var(--announcement-height)-var(--announcement-offset)-var(--footer-min-height))] has-data-[layout="half"]:content-center'
      )}>
      {children}
    </main>
  </LayoutWrapper>
)

export default Layout
