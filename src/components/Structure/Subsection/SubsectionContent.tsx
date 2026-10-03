import { cn } from '@/lib/cn'

export const SubsectionContent = ({
  ...props
}: Props<'div'> & {
  as?: React.JSX.ElementType
}) => {
  return (
    <div
      data-slot='subsection-content'
      className={cn(
        'not-in-data-open:pointer-events-none',
        'transition-all duration-200 **:transition-all',
        // 0fr → 1fr animates to the content's real height; the old max-h-screen cap clipped anything taller than one screen (long subsections on phones)
        'relative grid grid-rows-[0fr] in-data-open:grid-rows-[1fr]',
        'not-in-data-open:**:my-0',
        'sm:pl-12',
        props.className
      )}>
      {/* the single row the grid sizes; min-h-0 lets it shrink to nothing when closed */}
      <div className='grid min-h-0 overflow-hidden'>{props.children}</div>
    </div>
  )
}
