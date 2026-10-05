'use client'

import { tFnClient } from '@/_config/i18n/'
import type { NewTranslationKeys, NewTranslationObj } from '@/_config/i18n/_types'
import { getPermissions } from '@/hooks/usePermissions'
import { PRONOUNS } from '@/lib/constants/PRONOUNS'
import { SelectInput, useField, useTranslation } from '@payloadcms/ui'
import type { SelectInputProps } from '@payloadcms/ui/fields/Select'
import type { OptionObject, SelectFieldClientProps } from 'payload'
import { type CSSProperties, useState } from 'react'

const PronounsBase = ({ ...props }: SelectInputProps & { initValue?: string[] | null }) => {
  const t = useTranslation<NewTranslationObj, NewTranslationKeys>()

  const opts = PRONOUNS.map((o) => ({
    value: o,
    label: tFnClient(t, `pronoun:${o}`, true),
  }))

  const [value, setValue] = useState<string[]>(props.initValue ?? [])

  return (
    <>
      <SelectInput
        {...props}
        Label={<label>{tFnClient(t, 'label:pronouns', true)}</label>}
        options={opts}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e as OptionObject[])
          } else {
            const newValue = (e as OptionObject[]).map((ea) => ea.value)
            setValue(newValue as string[])
          }
        }}
        value={props.value ?? value}
        hasMany
      />
      <input
        type='hidden'
        name={`field-${props.path}-values`}
        value={value.join(',')}
        readOnly
      />
    </>
  )
}

const Pronouns = ({ ...props }: SelectFieldClientProps) => {
  const field = useField({ path: props.path })
  const { readOnly } = getPermissions({ args: props })

  return (
    <PronounsBase
      {...field}
      description={props.field.admin?.description}
      style={
        {
          ...(props.field.admin?.style as CSSProperties | undefined),
          '--field-width': '325px',
        } as CSSProperties
      }
      name={props.field.name as string}
      path={props.path}
      readOnly={readOnly}
      onChange={(e) => {
        field.setValue((e as OptionObject[]).map((e) => e.value))
      }}
      value={((field.value as string[]) ?? []).map((ea) => ea?.toLowerCase()) as string[]}
    />
  )
}

export default Pronouns
