'use client'

import { Field } from '@/_components/blocks/Form/_components/Field'
import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import type { FormFieldCountry } from '@/payload-types'
import { parseMetaError } from './_lib/parseMetaError'

type Country = { id: string; name: string | null | undefined }

export const CountrySelect = (props: FormFieldCountry & { countries: Country[] }) => {
  const { name, label, required, countries } = props
  const form = useFormContext()
  return (
    <form.Field
      name={name}
      validators={buildValidators(props)}>
      {(field) => (
        <Field
          name={name}
          label={label ?? undefined}
          required={required ?? false}
          type='formFieldCountry'
          error={parseMetaError(field.state.meta)}>
          <select
            id={`field-${name}`}
            name={`field-${name}`}
            value={field.state.value as string}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}>
            <option value=''>Select a country</option>
            {countries?.map((country) => (
              <option
                key={country.id}
                value={country.name ?? ''}>
                {country.name}
              </option>
            ))}
          </select>
        </Field>
      )}
    </form.Field>
  )
}
