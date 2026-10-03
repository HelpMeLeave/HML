'use client'
import { cn } from '@/lib/cn'

export const TemplateSwitchEl = ({
  useTemplate,
  ...props
}: { useTemplate: boolean } & Props<'button'>) => {
  return (
    <label className='flex cursor-pointer items-center gap-x-3'>
      <button
        {...props}
        type='button'
        role='switch'
        aria-checked={props['aria-checked'] ?? false}
        className={cn(
          'border-input relative inline-flex h-5 w-9 shrink-0 items-center justify-center rounded-full border-0 p-0 transition-colors focus-visible:outline-2',
          useTemplate ? 'bg-accent' : 'bg-current/20'
        )}>
        <span
          className={cn(
            'inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform',
            useTemplate ? 'translate-x-2' : '-translate-x-2'
          )}
        />
      </button>
      <span className='text-sm font-medium'>Use Template</span>
    </label>
  )
}
