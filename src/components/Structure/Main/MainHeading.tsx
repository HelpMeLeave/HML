import { Heading } from '@/components/primitives'
import { cn } from '@/lib/cn'

export const MainHeading = ({ ...props }: Props<'h1'>) => (
  <Heading
    level={1}
    data-slot='heading'
    className={cn(
      'font-header leading-[0.85] font-normal has-[+[data-slot="subtitle"]]:mb-[0.2em]',
      props.className
    )}>
    {props.children}
  </Heading>
)
