'use client'

import { FieldLabel } from '@/_components/blocks/Form/_components/Field'
import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import type { FormFieldText } from '@/payload-types'
import type { AnyFieldApi } from '@tanstack/react-form'

export const baseClass =
  'bg-input-bg placeholder:text-grey-500 focus:outline-accent outline-input-border hover:outline-input-border-hover shadow-input hover:shadow-input-hover block w-full rounded-lg px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-1 focus:-outline-offset-2 sm:text-sm/6 dark:bg-slate-950/50'

export const TextField = (props: {
  label: string
  name: string
  required?: boolean | null
  field: AnyFieldApi
  placeholder?: string | null
  type: 'text' | 'textarea' | 'number'
  min?: number
  max?: number
  width?: number
}) => {
  const { label, field, placeholder, required, name, type, min } = props
  return (
    <div
      style={{
        flex: `1 1 ${props.width}%`,
      }}>
      <FieldLabel
        label={label}
        name={name}
        required={required}
      />
      <div className='mt-2'>
        {['text', 'number'].includes(type) && (
          <input
            type={type}
            id={`field-${name}`}
            name={`field-${name}`}
            className={baseClass}
            defaultValue={field.state.value as string}
            onChange={(e) => field.handleChange(e.currentTarget.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder ?? undefined}
            min={min}
          />
        )}
        {type == 'textarea' && (
          <textarea
            rows={5}
            id={`field-${name}`}
            name={`field-${name}`}
            className={baseClass}
            defaultValue={field.state.value as string}
            onChange={(e) => field.handleChange(e.currentTarget.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder ?? undefined}
          />
        )}
      </div>
    </div>
  )
}

export const TextFieldComponent = (props: FormFieldText) => {
  const { name, label, required, placeholder, width } = props
  const form = useFormContext()
  return (
    <form.Field
      name={name}
      validators={buildValidators(props)}>
      {(field) => (
        <TextField
          type='text'
          label={label}
          required={required}
          field={field}
          placeholder={placeholder}
          name={name}
          width={width}
        />
      )}
    </form.Field>
  )
}
