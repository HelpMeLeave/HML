'use client'

import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import { BaseSelect } from '@/_components/blocks/Form/SelectField'
import { PRONOUNS } from '@/lib/constants/PRONOUNS'
import type { FormFieldPronouns } from '@/payload-types'
/*8-16*/
import './pronouns.scss'

export const PronounsFieldComponent = (props: FormFieldPronouns) => {
  const { name, label, required } = props
  const form = useFormContext()
  return (
    <form.Field
      name={name}
      validators={buildValidators(props)}>
      {(field) => (
        <BaseSelect
          hasMany
          label={label}
          required={required}
          name={name}
          options={PRONOUNS?.map((ea) => ({
            label: ea,
            value: ea,
          }))}
          field={field}
          width={100}
          placeholder={'Select Your Preferred Pronouns'}
        />
      )}
    </form.Field>
  )
}
