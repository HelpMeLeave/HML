import { List } from '@/components/primitives'
import { cn } from '@/lib/cn'

export const CheckmarkList = ({ ...props }: Props<typeof List>) => (
  <List
    type='checkmark'
    {...props}
    className={cn(props.className)}
  />
)
