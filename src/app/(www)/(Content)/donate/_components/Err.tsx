import { cn } from '@/lib/cn'

export const Err = ({ err, message, ...props }: Props<'p'> & { err: boolean; message: string }) => {
  return (
    err && (
      <p
        {...props}
        className={cn('mt-2 text-sm text-red-500 dark:text-red-300', props.className)}>
        {message}
      </p>
    )
  )
}
