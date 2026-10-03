'use client'

import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import { TextField } from '@/_components/blocks/Form/TextField'
import type { FormFieldTextarea } from '@/payload-types'

export const TextareaFieldComponent = (props: FormFieldTextarea) => {
  const { name, label, required, placeholder } = props
  const form = useFormContext()
  return (
    <form.Field
      name={name}
      validators={buildValidators(props)}>
      {(field) => (
        <TextField
          type='textarea'
          field={field}
          name={name}
          label={label}
          placeholder={placeholder}
          required={required}
        />
      )}
    </form.Field>
  )
}
