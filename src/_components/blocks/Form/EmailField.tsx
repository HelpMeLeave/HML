'use client'

import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import { TextField } from '@/_components/blocks/Form/TextField'
import type { FormFieldEmail } from '@/payload-types'

export const EmailFieldComponent = (props: FormFieldEmail) => {
  const { name, label, required } = props
  const form = useFormContext()
  return (
    <form.Field
      name={name}
      validators={buildValidators(props)}>
      {(field) => (
        <TextField
          type='text'
          label={label}
          name={name}
          field={field}
          required={required}
        />
      )}
    </form.Field>
  )
}
