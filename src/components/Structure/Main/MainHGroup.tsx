import { cn } from '@/lib/cn'

export const MainHGroup = ({ ...props }) => {
  return (
    <hgroup
      title=''
      data-slot='header'
      className={cn(
        'grid grid-cols-1',
        '*:slot-eyebrow:row-start-1',
        '*:slot-heading:row-start-2',
        '*:data-[slot=subtitle]:row-start-3',
        'text-6xl has-[+.flow]:mb-[0.2em]',
        props.className
      )}
      {...props}
    />
  )
}
