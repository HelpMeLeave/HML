'use client'

import { FieldSet } from '@/_components/blocks/Form/_components/Field'
import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import { baseClass } from '@/_components/blocks/Form/TextField'
import { cn } from '@/lib/cn'
import type { FormFieldRadio, FormFieldSwitchRadio } from '@/payload-types'
import type { AnyFieldApi } from '@tanstack/react-form'
import { parseMetaError } from './_lib/parseMetaError'

type TanstackAnyFieldAPI = AnyFieldApi

export const BaseRadio = ({
  label,
  name,
  required,
  field,
  options,
  size = 'md',
}: {
  size?: 'sm' | 'md' | 'lg'
  label?: string | null
  required?: boolean | null
  name: string
  // @ts-ignore Tanstatck issue
  field: TanstackAnyFieldAPI
  options?: FormFieldRadio['options'] | FormFieldSwitchRadio['options']
}) => {
  return (
    <FieldSet
      label={label}
      required={!!required}
      error={parseMetaError(field.state.meta)}>
      <div
        className={cn(
          'mt-2 grid grid-cols-3 gap-3 sm:grid-cols-5',
          size == 'md' && 'sm:grid-cols-2',
          size == 'lg' && 'sm:grid-cols-1'
        )}>
        {options?.map((opt) => (
          <BaseRadioOption
            key={opt.id}
            option={opt}
            name={name}
            field={field}
          />
        ))}
      </div>
    </FieldSet>
  )
}

const BaseRadioOption = ({
  field,
  name,
  option,
}: {
  name: string
  field: AnyFieldApi
  option: Valid<FormFieldRadio['options'] | FormFieldSwitchRadio['options']>[number]
}) => {
  return (
    <label
      key={option.id}
      aria-label={`field-${name}`}
      className={cn(
        baseClass,
        'focus-within:outline-accent/50',
        'has-checked:border-accent has-checked:bg-accent has-checked:text-white dark:has-checked:text-black',
        'relative flex items-center justify-center rounded-lg border px-4 py-3',
        'has-focus-visible:outline-1 has-focus-visible:outline-offset-2',
        'border-input-border',
        'has-disabled:opacity-25'
      )}>
      <input
        id={`field-${name}-${option}`}
        name={`field-${name}`}
        value={option.value}
        onChange={() => field.handleChange(option.value)}
        onBlur={field.handleBlur}
        defaultChecked={field.state.value === option.value}
        type='radio'
        className='absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed'
      />
      <span className='px-2 font-mono text-xs font-normal text-nowrap text-current uppercase'>
        {option.label}
      </span>
    </label>
  )
}

export const RadioFieldComponent = (props: FormFieldRadio) => {
  const { name, label, required, options } = props
  const form = useFormContext()
  return (
    <form.Field
      name={name}
      validators={buildValidators(props)}>
      {(field) => (
        <BaseRadio
          name={name}
          field={field}
          options={options}
          label={label}
          required={required}
        />
      )}
    </form.Field>
  )
}
