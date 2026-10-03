'use client'
import { isDateType } from '@/components/Form/_lib/checks'
import type { InputType } from '@/components/Form/_types'
import { cn } from '@/lib/cn'
import { type InputProps as HeadlessInputProps, Input as HeadlessInput } from '@headlessui/react'
import { type ComponentPropsWithoutRef, type ForwardedRef, forwardRef } from 'react'

export function InputGroup({ children }: ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-slot='control'
      className={cn(
        'relative isolate block',
        'has-[[data-slot=icon]:first-child]:[&_input]:pl-10 has-[[data-slot=icon]:last-child]:[&_input]:pr-10 sm:has-[[data-slot=icon]:first-child]:[&_input]:pl-8 sm:has-[[data-slot=icon]:last-child]:[&_input]:pr-8',
        '*:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-3 *:data-[slot=icon]:z-10 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:top-2.5 sm:*:data-[slot=icon]:size-4',
        '[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5',
        '*:data-[slot=icon]:text-muted/50',
        '*:data-[slot=icon]:transition focus-within:*:data-[slot=icon]:text-muted/75 dark:focus-within:*:data-[slot=icon]:text-muted'
      )}>
      {children}
    </span>
  )
}

export const Input = forwardRef(function Input(
  {
    type,
    className,
    ...props
  }: {
    className?: string
    type?: InputType
  } & Omit<HeadlessInputProps, 'as' | 'className'>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const isDt = isDateType(type)
  const isEmail = type == 'email'

  const autocomplete = () => {
    if (props.autoComplete) return props.autoComplete
    if (props['aria-autocomplete']) return props['aria-autocomplete']

    if (isEmail) return 'email'
    return undefined
  }

  return (
    <span
      data-slot='control'
      className={cn([
        className,
        // Basic layout
        'relative block w-full',
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        'before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-input-bg before:shadow-sm',
        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        'dark:before:hidden',
        // Focus ring
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-[1.5px]',
        'sm:has-focus-visible:after:ring-accent dark:sm:has-focus-visible:after:ring-accent-muted',
        // Disabled state
        'has-data-disabled:opacity-50 has-data-disabled:before:bg-ui-950/5 has-data-disabled:before:shadow-none',
        ,
      ])}>
      <HeadlessInput
        ref={ref}
        {...props}
        autoComplete={autocomplete()}
        className={cn([
          // Date classes
          isDt && [
            '[&::-webkit-datetime-edit-fields-wrapper]:p-0',
            '[&::-webkit-date-and-time-value]:min-h-[1.5em]',
            '[&::-webkit-datetime-edit]:inline-flex',
            '[&::-webkit-datetime-edit]:p-0',
            '[&::-webkit-datetime-edit-year-field]:p-0',
            '[&::-webkit-datetime-edit-month-field]:p-0',
            '[&::-webkit-datetime-edit-day-field]:p-0',
            '[&::-webkit-datetime-edit-hour-field]:p-0',
            '[&::-webkit-datetime-edit-minute-field]:p-0',
            '[&::-webkit-datetime-edit-second-field]:p-0',
            '[&::-webkit-datetime-edit-millisecond-field]:p-0',
            '[&::-webkit-datetime-edit-meridiem-field]:p-0',
          ],
          // Basic layout
          'relative block w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
          // Typography
          'text-base/6 text-body placeholder:text-soft sm:text-sm/6',
          // Border
          'border border-input-border data-hover:border-(--theme-input-hover-border)',
          // Background color
          'bg-transparent dark:bg-input-bg',
          // Hide default focus styles
          'focus:outline-hidden',
          // Invalid state
          'data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-600 dark:data-invalid:data-hover:border-red-600',
          // Disabled state
          'dark:data-disabled:bg-input/2.5 data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-hover:data-disabled:border-white/15',
          // System icons
          'dark:scheme-dark',
        ])}
      />
    </span>
  )
})
