'use client'

import { getPermissions } from '@/hooks/usePermissions'
import { SelectInput, useField } from '@payloadcms/ui'

import type { JSONFieldClientProps, OptionObject } from 'payload'

type Props = JSONFieldClientProps & {
  label: string
  name: string
  description: string
  options: OptionObject[]
}

export const SelectMultiField = ({ label, name, description, options, ...args }: Props) => {
  const field = useField({ path: args.path })
  const permissions = getPermissions({ args })

  return (
    <SelectInput
      label={label}
      options={options}
      name={name}
      description={description}
      path={args.path}
      hasMany
      onChange={(value) => {
        field.setValue((value as OptionObject[]).map((v) => v.value))
      }}
      value={field.value as string[]}
      className={args.field.admin?.className}
      style={args.field.admin?.style}
      readOnly={!permissions.canWrite}
    />
  )
}
