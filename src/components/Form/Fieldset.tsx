import { Card } from '@/components/Card'
import { cn } from '@/lib/cn'
import {
  type DescriptionProps as HeadlessDescriptionProps,
  type FieldProps as HeadlessFieldProps,
  type FieldsetProps as HeadlessFieldsetProps,
  type LabelProps as HeadlessLabelProps,
  type LegendProps as HeadlessLegendProps,
  Description as HeadlessDescription,
  Field as HeadlessField,
  Fieldset as HeadlessFieldset,
  Label as HeadlessLabel,
  Legend as HeadlessLegend,
} from '@headlessui/react'
import { type ComponentPropsWithoutRef } from 'react'

export const Fieldset = ({
  className,
  wrapperProps,
  ...props
}: { className?: string; wrapperProps?: Props<typeof Card> } & Omit<
  HeadlessFieldsetProps,
  'as' | 'className' | 'children'
>
  & Pick<Props<'fieldset'>, 'children'>) => {
  return (
    <Card
      {...wrapperProps}
      className={cn('card mt-6', wrapperProps?.className)}>
      <HeadlessFieldset
        {...props}
        className={cn(
          className,
          'group mx-0 my-0 *:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-4'
        )}
      />
    </Card>
  )
}

export const Legend = ({
  className,
  size = 'sm',
  offset = true,
  ...props
}: { className?: string; size?: 'sm' | 'lg'; offset?: boolean } & Omit<
  HeadlessLegendProps,
  'as' | 'className'
>) => {
  return (
    <HeadlessLegend
      data-slot='legend'
      {...props}
      as='legend'
      className={cn(
        className,
        offset ? 'absolute' : '',
        'w-max max-w-max px-4 font-semibold text-body uppercase data-disabled:opacity-50',
        size == 'sm' && 'font-semibold text-base/6 sm:text-sm/6',
        size == 'sm'
          && offset
          && 'relative top-[-0.5em] px-0 font-mono font-normal tracking-widest text-muted opacity-75 transition group-hover:font-medium group-hover:text-body group-hover:opacity-100',
        size == 'lg' && offset && 'top-[-0.4em]',
        size == 'lg' && 'font-body text-base/[0.85]'
      )}
    />
  )
}

export const FieldGroup = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      data-slot='control'
      {...props}
      className={cn(className, 'space-y-8')}
    />
  )
}
export const FieldRow = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      data-slot='control'
      data-layout-group='row'
      {...props}
      className={cn(className, 'flex flex-wrap gap-6', '[&+[data-slot="field"]]:mt-6')}
    />
  )
}

export const Field = ({
  className,
  ...props
}: { className?: string } & Omit<HeadlessFieldProps, 'as' | 'className'>) => {
  return (
    <HeadlessField
      {...props}
      data-slot='field'
      className={cn(
        'flex-1',
        className,
        '[&>[data-slot=label]+[data-slot=control]]:mt-0',
        '[&>[data-slot=label]+[data-slot=description]]:mt-1',
        '[&>[data-slot=description]+[data-slot=control]]:mt-3',
        '[&>[data-slot=control]+[data-slot=description]]:mt-3',
        '[&>[data-slot=control]+[data-slot=error]]:mt-3',
        'not-in-data-[layout-group="row"]:[&+[data-slot=field]]:mt-6'
      )}
    />
  )
}

export const Label = ({
  required,
  className,
  children,
  ...props
}: { className?: string; required?: boolean } & Omit<
  HeadlessLabelProps,
  'as' | 'className' | 'children'
>
  & Pick<Props<'label'>, 'children'>) => {
  const isReq = [required, props['aria-required']].some(
    (ea) =>
      ea
      && (typeof ea == 'boolean' ? ea
      : typeof ea == 'string' ? ea != 'false'
      : Boolean(ea))
  )

  return (
    <HeadlessLabel
      aria-required={isReq}
      data-slot='label'
      {...props}
      className={cn(
        'flex flex-row items-baseline font-medium text-base select-none data-disabled:opacity-50 sm:text-sm',
        className
      )}>
      <span className='relative top-[.6em] hidden -translate-y-1/2 pr-1 text-xl leading-[0.75em] text-red-500 saturate-150 in-required:block in-aria-required:block'>
        *
      </span>
      <span>{children}</span>
    </HeadlessLabel>
  )
}

export const Description = ({
  className,
  ...props
}: { className?: string } & Omit<HeadlessDescriptionProps, 'as' | 'className'>) => {
  return (
    <HeadlessDescription
      data-slot='description'
      {...props}
      className={cn(className, 'text-base/6 text-muted data-disabled:opacity-50 sm:text-xs/4')}
    />
  )
}

export const ErrorMessage = ({
  className,
  ...props
}: { className?: string } & Omit<HeadlessDescriptionProps, 'as' | 'className'>) => {
  return (
    <HeadlessDescription
      data-slot='error'
      {...props}
      className={cn(
        className,
        'font-medium text-base/6 text-red-500 saturate-110 data-disabled:opacity-50 sm:text-sm/6 dark:text-red-500'
      )}
    />
  )
}
