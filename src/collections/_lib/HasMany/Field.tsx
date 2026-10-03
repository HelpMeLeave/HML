'use client'

import { HasManyFieldClient } from '@/collections/_lib/HasMany/Field.client'
import { cn } from '@/lib/cn'
import { FieldLabel } from '@payloadcms/ui'
import type { TextFieldServerProps } from 'payload'

const HasManyField = (props: TextFieldServerProps) => {
  const { path, clientField, readOnly, field } = props

  return (
    <div
      style={{
        ...field.admin?.style,
      }}
      className={cn(
        'field-type text has-many-wrapper',
        field.admin?.className,
        clientField?.admin?.className
      )}>
      <FieldLabel
        path={path}
        label={field.label ? String(field.label) : undefined}
        required={field.required ?? false}
      />

      <HasManyFieldClient
        field={clientField}
        name={field.name}
        path={path}
        readOnly={readOnly}
        required={field.required ?? false}
      />
    </div>
  )
}

export default HasManyField
