import { cn } from '@/lib/cn'

export const Body = (props: Props<'body'>) => (
  <body
    {...props}
    id='www'
    className={cn(
      'min-h-svh',
      'printer-page:mt-20 antialiased',
      'text-body',
      'has-[#homePage]:bg-[#080808] has-[#homePage]:pb-0 has-[#homePage]:text-white'
    )}
  />
)
