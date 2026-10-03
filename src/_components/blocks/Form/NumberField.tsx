'use client'

import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import { TextField } from '@/_components/blocks/Form/TextField'
import type { FormFieldNumber } from '@/payload-types'

export const NumberFieldComponent = (props: FormFieldNumber) => {
  const { name, label, required } = props
  const form = useFormContext()
  return (
    <form.Field
      name={name}
      validators={buildValidators(props)}>
      {(field) => (
        <TextField
          type='number'
          field={field}
          name={name}
          label={label}
          required={required}
          min={0}
        />
      )}
    </form.Field>
  )
}
