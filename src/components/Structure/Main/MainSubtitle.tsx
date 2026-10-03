import { Subtitle } from '@/components/Structure/Subtitle'
import { cn } from '@/lib/cn'

export const MainSubtitle = ({ ...props }: Props) => {
  return (
    <Subtitle
      data-slot='subtitle'
      {...props}
      className={cn(props.className)}
    />
  )
}
