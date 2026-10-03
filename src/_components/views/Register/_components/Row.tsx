import { cn } from '@/lib/cn'

export const Row = ({ ...props }: Props) => {
  return (
    <span
      {...props}
      className={cn('flex flex-wrap gap-4 *:flex-1', props.className)}
    />
  )
}
