import { SocialIcon } from '@/components/Icon/Social'
import { cn } from '@/lib/cn'

const Icon = ({ ...props }: Props<'svg'>) => (
  <SocialIcon
    style={{
      height: '1rem',
    }}
    className={cn(
      'overflow-visible rounded-full outline-accent in-focus-visible:outline-2 in-focus-visible:outline-offset-2',
      props.className
    )}
  />
)

export default Icon
