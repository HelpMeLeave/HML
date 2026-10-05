import { SectionBase, SectionHGroup } from '@/components/Structure/Section'
import { cn } from '@/lib/cn'
import { type DialogProps, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import type React from 'react'

const sizes = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
}

export function Modal({
  size = 'lg',
  className,
  children,
  ...props
}: {
  size?: keyof typeof sizes
  className?: string
  children: React.ReactNode
} & Omit<DialogProps, 'as' | 'className'>) {
  return (
    <Dialog {...props}>
      <DialogBackdrop
        transition
        className='bg-foreground/45 fixed inset-0 flex w-screen click justify-center overflow-y-auto px-2 py-2 backdrop-blur-[2px] transition duration-100 focus:outline-0 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-background/75'
      />

      <div className='fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0'>
        <div className='grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4'>
          <DialogPanel
            transition
            as={SectionBase}
            className={cn(
              className,
              sizes[size],
              'row-start-2 w-full min-w-0 rounded-t-3xl bg-card p-(--gutter) shadow-lg ring-1 ring-accent-950/10 [--gutter:--spacing(8)] sm:row-start-2 sm:mb-auto sm:rounded-2xl dark:bg-card dark:ring-white/10 forced-colors:outline',
              'transition duration-100 will-change-transform data-closed:translate-y-12 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:data-closed:translate-y-0 sm:data-closed:data-enter:scale-95'
            )}>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export const ModalHeading = ({ ...props }: Props<typeof SectionHGroup>) => (
  <SectionHGroup {...props} />
)

export function ModalBody({ ...props }: Props<'div'>) {
  return (
    <div
      data-slot='body'
      {...props}
    />
  )
}

export function ModalActions({ className, ...props }: Props<'div'>) {
  return (
    <div
      data-slot='actions'
      {...props}
      className={cn(
        'mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto',
        className
      )}
    />
  )
}
