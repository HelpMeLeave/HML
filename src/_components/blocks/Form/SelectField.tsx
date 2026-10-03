'use client'

import { FieldLabel } from '@/_components/blocks/Form/_components/Field'
import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import { baseClass } from '@/_components/blocks/Form/TextField'
import { cn } from '@/lib/cn'
import { toArray } from '@/lib/normalize/to'
import type { FormFieldSelect } from '@/payload-types'
// The barrel is the whole admin client and its sideEffects css survives tree-shaking.
// This field is reachable from the site via pageConverters > FormBlockConverter > renderField, so the barrel shipped ~1.3MB onto every content page.
// Even the narrow subpath ships its own index.scss, and renderField.tsx is statically reachable from pageConverters, so every [...slug] page loaded ~8KB of admin select styles (rs__*, field-label, shimmer-effect).
// dynamic() defers the chunk until a select is actually rendered. ssr: false keeps the CSS out of the initial payload for form-less pages.
import type { AnyFieldApi } from '@tanstack/react-form'
import dynamic from 'next/dynamic'
import type { OptionObject } from 'payload'

const ReactSelect = dynamic(
  () => import('@payloadcms/ui/elements/ReactSelect').then((m) => m.ReactSelect),
  { ssr: false }
)

export const BaseSelect = ({
  width,
  label,
  name,
  required,
  hasMany,
  field,
  placeholder,
  options,
}: {
  width: number
  label?: string | null
  name: string
  required?: boolean | null
  hasMany?: boolean | null
  field: AnyFieldApi
  placeholder?: string | null
  options?: (OptionObject & { id?: string | null })[] | null
}) => {
  return (
    options && (
      <div
        style={{
          flex: `1 1 ${width}%`,
        }}>
        <FieldLabel
          label={label}
          name={name}
          required={required}
        />
        <ReactSelect
          placeholder={placeholder ?? undefined}
          className={cn(baseClass, 'fe-form')}
          id={`field-${name}`}
          value={((field.state.value as string[]) ?? []).map((ea) => ({
            label: ea,
            value: ea,
          }))}
          isMulti={!!hasMany}
          onChange={(e) => {
            const vals = toArray(e)
            field.handleChange(vals.map((ea) => ea.value))
          }}
          options={options as OptionObject[]}
        />
      </div>
    )
  )
}

export const SelectFieldComponent = (props: FormFieldSelect) => {
  const { name, label, required, hasMany, placeholder, options } = props
  const form = useFormContext()
  return (
    <form.Field
      name={name}
      validators={buildValidators(props)}>
      {(field) => (
        <BaseSelect
          label={label}
          required={required}
          name={name}
          field={field}
          width={100}
          options={options}
          hasMany={hasMany}
          placeholder={placeholder}
        />
      )}
    </form.Field>
  )
}
