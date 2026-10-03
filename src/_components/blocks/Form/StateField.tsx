'use client'

import { Field } from '@/_components/blocks/Form/_components/Field'
import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import type { FormFieldState } from '@/payload-types'
import { parseMetaError } from './_lib/parseMetaError'

export const StateFieldComponent = (props: FormFieldState) => {
  const { name, label, required } = props
  const form = useFormContext()
  return (
    <form.Field
      name={name}
      validators={buildValidators(props)}>
      {(field) => (
        <Field
          required={!!required}
          label={label}
          name={name}
          type='formFieldState'
          error={parseMetaError(field.state.meta)}>
          <input
            type='text'
            id={`field-${name}`}
            name={`field-${name}`}
            value={field.state.value as string}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        </Field>
      )}
    </form.Field>
  )
}
