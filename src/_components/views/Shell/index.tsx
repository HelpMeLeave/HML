import { LocationEl } from '@/_components/views/Shell/Location'
import { cn } from '@/lib/cn'
import type { AdminViewServerProps } from 'payload'

export default function Shell({
  children,
  ...props
}: AdminViewServerProps & { children: ReactNode }) {
  return (
    <div
      id='shell'
      className={cn(
        'has-data-[collection=users]:has-data-[subview=create]:has-[.countdown]:**:[.app-header,#nav-toggler]:z-0'
      )}>
      <LocationEl />
      {children}
    </div>
  )
}
