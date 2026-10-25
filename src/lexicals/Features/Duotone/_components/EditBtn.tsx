import { cn } from '@/lib/cn'
import { Button } from '@payloadcms/ui'
import type { ComponentProps } from 'react'

export const EditBtn = ({
  className,
  active,
  ...props
}: ComponentProps<typeof Button> & { active?: boolean }) => (
  <Button
    size='xsmall'
    iconStyle='without-border'
    round={true}
    margin={false}
    type='button'
    buttonStyle='none'
    className={cn(
      'grid size-5 cursor-pointer place-items-center border-[0.5px] border-ui-500 bg-background p-0 text-body outline-0 outline-offset-1 outline-accent transition-all *:size-[0.8rem] hover:outline-2 hover:outline-offset-0 disabled:cursor-default disabled:opacity-35 data-[state="active"]:outline-2 dark:border-ui-0',
      className
    )}
    extraButtonProps={{ 'data-state': active ? 'active' : undefined }}
    {...props}
  />
)
