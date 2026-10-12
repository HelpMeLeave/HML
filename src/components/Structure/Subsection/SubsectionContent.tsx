import { cn } from '@/lib/cn'

export const SubsectionContent = ({
  ...props
}: Props<'div'> & {
  as?: React.JSX.ElementType
}) => {
  return (
    <div
      data-slot='content'
      className={cn(
        'not-in-data-[state=open]:pointer-events-none',
        'transition-all duration-200 **:transition-all',
        'relative grid grid-rows-[0fr] in-data-[state=open]:grid-rows-[1fr]',
        'not-in-data-[state=open]:**:my-0',
        'sm:pl-6 md:pl-6',
        props.className
      )}>
      {/* the single row the grid sizes; min-h-0 lets it shrink to nothing when closed */}
      <div className='flow grid min-h-0 overflow-hidden'>{props.children}</div>
    </div>
  )
}
