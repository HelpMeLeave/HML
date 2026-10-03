import { cn } from '@/lib/cn'

import { Logo } from '@/components/Logo'

export const FooterLogo = () => (
  <Logo
    mark='uppercase'
    logoType='mark'
    className='hidden h-full w-auto text-brand-red md:block md:text-red-700 dark:text-yellow-500 print:h-30'
  />
)

export const FooterMainSection = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={cn(
        'mx-auto grid w-full grid-cols-1 items-end space-y-8 px-6 md:max-w-7xl md:grid-cols-[auto_1fr] md:items-center md:space-y-0 md:*:my-0',
        'lg:grid-rows-[auto_1fr] lg:justify-around lg:gap-x-8 lg:px-40'
      )}>
      {children}
    </div>
  )
}
