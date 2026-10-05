import { Heading } from '@/components/primitives'
import { cn } from '@/lib/cn'

export const MainHeading = ({ ...props }: Props<'h1'>) => (
  <Heading
    level={1}
    role='heading'
    data-slot='heading'
    className={cn('has-[+[data-slot="subtitle"]]:mb-[0.2em]', props.className)}>
    {props.children}
  </Heading>
)
