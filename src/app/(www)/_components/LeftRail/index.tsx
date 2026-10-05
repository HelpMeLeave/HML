import { cn } from '@/lib/cn'

const LeftRailBase = (props: Props<'aside'>) => (
  <aside
    {...props}
    className={cn(
      'col-start-2 mb-10 border-b border-muted pb-6',
      'xl:sticky xl:top-[calc(var(--nav-height)+3.75rem)] xl:mb-0 xl:self-start',
      'xl:max-h-[calc(100svh-var(--nav-height)-6rem)] xl:overflow-y-auto',
      'xl:border-b-0 xl:pb-0',
      props.className
    )}
  />
)

export const SmLeftRail = (props: Props<'aside'>) => (
  <LeftRailBase
    {...props}
    className={cn('mt-8 xl:max-w-47.5', props.className)}
  />
)

export const MdLeftRail = (props: Props<'aside'>) => (
  <LeftRailBase
    {...props}
    className={cn(
      'ml-auto max-h-min pb-0 sm:top-[calc(var(--nav-height))] md:sticky xl:top-0 xl:max-w-full',
      props.className
    )}
  />
)
