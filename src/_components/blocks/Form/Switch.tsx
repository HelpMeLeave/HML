'use client'

import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import { BaseRadio } from '@/_components/blocks/Form/RadioField'
import { renderField } from '@/_components/blocks/Form/renderField'
import type { FormFieldSwitchRadio } from '@/payload-types'
import { useSelector } from '@tanstack/react-store'
import { Fragment } from 'react/jsx-runtime'

export const SwitchFieldRadioComponent = (props: FormFieldSwitchRadio) => {
  const { required, name, options, label } = props
  const form = useFormContext()

  if (!options) return <></>

  return (
    <Fragment>
      <form.Field
        name={name}
        validators={buildValidators(props)}>
        {(field) => (
          <>
            <BaseRadio
              size='lg'
              field={field}
              name='timezone'
              label={label}
              required={required}
              options={options}
            />
          </>
        )}
      </form.Field>
      <NestedFields
        name={name}
        options={options}
      />
    </Fragment>
  )
}

const NestedFields = ({ name, options }: Pick<FormFieldSwitchRadio, 'name' | 'options'>) => {
  const form = useFormContext()
  const currentValue = useSelector(form.store, (ea) => ea.values[name])
  if (!options) return <></>

  const selectedOptionId = options.findIndex((ea) => ea.value == currentValue)
  const selectedOption = selectedOptionId >= 0 && options[selectedOptionId]

  const nestedNotChecked = options
    .flatMap((opt) => {
      if (selectedOption) if (opt.value == selectedOption.value) return null
      return opt.questionsIfUnselected
    })
    .filter(Boolean)

  const nestedChecked = options
    .filter((opt) => selectedOption && opt.value == selectedOption.value)
    .flatMap((ea) => ea.questionsIfSelected)
    .filter(Boolean)

  return (
    <>
      {nestedChecked.map((ea) => ea && renderField(ea))}{' '}
      {nestedNotChecked.map((ea) => ea && renderField(ea))}
    </>
  )
}
