'use client'

import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import { BaseSelect } from '@/_components/blocks/Form/SelectField'
import type { FormFieldTimezone } from '@/payload-types'
import { defaultTimezones } from 'payload/shared'

export const TimezoneFieldComponent = (props: FormFieldTimezone) => {
  const { required, label, width } = props
  const form = useFormContext()
  return (
    <form.Field
      name={'timezone'}
      validators={buildValidators({
        required: props.required,
        label: 'TimeZone',
        blockType: 'formFieldTimezone',
        width: 100,
      })}>
      {(field) => (
        <BaseSelect
          field={field}
          name='timezone'
          label={label}
          width={width}
          required={required}
          options={defaultTimezones}
        />
      )}
    </form.Field>
  )
}
