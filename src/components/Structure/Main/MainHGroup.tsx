import { cn } from '@/lib/cn'

export const MainHGroup = ({ ...props }) => (
  <hgroup
    data-slot='page-title'
    className={cn(
      'grid grid-cols-1',
      '*:data-[slot=page-eyebrow]:row-start-1',
      '*:data-[slot=page-heading]:row-start-2',
      '*:data-[slot=page-subtitle]:row-start-3',
      'text-6xl',
      props.className
    )}
    {...props}
  />
)
