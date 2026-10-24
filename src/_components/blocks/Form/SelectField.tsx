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

const selectClassName = String.raw`focus-within:outline-accent has-[.rs\_\_control:hover]:border-input-hover-border rs-control:hover:cursor-text rs-menu:top-[105%]! rs-menu:left-0 rs-menu:z-2 rs-menu:min-h-5 rs-menu:overflow-hidden rs-menu:rounded-lg rs-menu:border rs-menu:border-input-border rs-menu:bg-background rs-menu:text-[1rem] rs-menu:leading-normal rs-menu:capitalize rs-menu:hover:border-input-hover-border rs-menu:before:absolute rs-menu:before:size-full rs-menu:before:bg-slate-950/50 rs-option:p-2 rs-option:hover:bg-slate-100/5 rs-value-container:gap-x-1.25 rs-multi-value:rounded-lg rs-multi-value:border-[0.75px] rs-multi-value:border-accent rs-multi-value:bg-accent/20 rs-multi-value:pl-1 rs-multi-value:transition-all rs-multi-value:duration-300 rs-multi-value:ease-[ease] rs-multi-value:has-[.multi-value-remove:hover]:border-transparent rs-multi-value:has-[.multi-value-remove:hover]:bg-accent/5 rs-multi-value:[&_:is(.multi-value-label,.multi-value-remove)]:pl-[0.15rem] rs-multi-value:[&_:is(.multi-value-label,.multi-value-remove)]:font-mono rs-multi-value:[&_:is(.multi-value-label,.multi-value-remove)]:font-[450] rs-multi-value:[&_:is(.multi-value-label,.multi-value-remove)]:text-accent rs-multi-value:[&_:is(.multi-value-label,.multi-value-remove)]:uppercase rs-multi-value:[&_.multi-value-remove]:cursor-pointer rs-placeholder:w-full rs-placeholder:italic rs-placeholder:opacity-75`

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
          // className={cn(baseClass, 'fe-form')}
          className={cn(baseClass, 'fe-form', selectClassName)}
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
