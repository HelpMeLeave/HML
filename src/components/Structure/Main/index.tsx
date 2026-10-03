import type { tAdminBarCTX } from '@/app/(www)/_providers/_types'
import { cn } from '@/lib/cn'
import type { User } from '@/payload-types'
import { MainClient } from './index.client'

export const Main = ({
  ['data-page']: page,
  ['data-layout']: layout = 'constrained',
  ['data-hasAdminBar']: hasAdminBar = undefined,
  children,
  adminData,
  ...props
}: Props.WithRef<'div'> & {
  ['data-hasAdminBar']?: boolean | User
  ['data-layout']?: 'full' | 'constrained' | 'half'
  ['data-page']: string
  adminData?: tAdminBarCTX['data']
}) => {
  return (
    <div
      {...props}
      data-slot='page'
      data-hasadminbar={Boolean(hasAdminBar) ? undefined : false}
      data-layout={layout}
      data-page={page}
      className={cn(
        'h-fill relative mb-8 pb-8',
        layout == 'full' && 'col-span-full mx-0 max-w-none',
        layout == 'constrained' && ['col-start-2', 'xl:col-start-4'],
        layout == 'half' && ['col-start-2', 'md:col-start-4'],
        '[#homePage]:my-0 [#homePage]:py-0',
        props.className
      )}>
      <MainClient mainData={adminData} />

      {children}
    </div>
  )
}

export { MainEyebrow } from './MainEyebrow'
export { MainHeading } from './MainHeading'
export { MainHGroup } from './MainHGroup'
export { MainSubtitle } from './MainSubtitle'
