'use client'

import { FieldLabel } from '@/_components/blocks/Form/_components/Field'
import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import { baseClass } from '@/_components/blocks/Form/TextField'
import { cn } from '@/lib/cn'
import type { FormFieldCheckbox } from '@/payload-types'

const Checkmark = () => {
  return (
    <svg
      fill='none'
      viewBox='0 0 14 14'
      className='pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-background group-has-disabled:stroke-white/25'>
      <path
        d='M3 8L6 11L11 3.5'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className='opacity-0 group-has-checked:opacity-100'
      />
      <path
        d='M3 7H11'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className='opacity-0 group-has-indeterminate:opacity-100'
      />
    </svg>
  )
}

export const CheckboxFieldComponent = (props: FormFieldCheckbox) => {
  const { required, name, label } = props
  const form = useFormContext()
  return (
    <form.Field
      name={name}
      validators={buildValidators(props)}>
      {(field) => (
        <>
          <div className='flex gap-3'>
            <div className='flex h-6 shrink-0 items-center'>
              <div className='group grid size-4 grid-cols-1'>
                <input
                  type='checkbox'
                  name={`field-${name}`}
                  id={`field-${name}`}
                  defaultChecked={field.state.value as boolean}
                  onClick={(e) => field.handleChange(e.currentTarget.checked)}
                  onBlur={field.handleBlur}
                  aria-describedby='comments-description'
                  className={cn(
                    baseClass,
                    'px-0',
                    'col-start-1 row-start-1 appearance-none checked:border-accent checked:bg-accent indeterminate:border-accent indeterminate:bg-accent disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-white/10 forced-colors:appearance-auto'
                  )}
                />
                <Checkmark />
              </div>
            </div>
            <div className='text-sm/6'>
              <FieldLabel
                name={name}
                label={label}
                required={required}
              />
            </div>
          </div>
        </>
      )}
    </form.Field>
  )
}
