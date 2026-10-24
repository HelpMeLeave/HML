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
        'field-type text has-many-wrapper in-sidebar:max-sidebar:grid in-sidebar:max-sidebar:grid-cols-[300px_repeat(2,1fr)] in-sidebar:max-sidebar:max-[901px]:flex in-sidebar:max-sidebar:max-[901px]:flex-col in-sidebar:sidebar:my-0 in-sidebar:max-sidebar:[&_label]:col-[1/4] in-sidebar:max-sidebar:[&_label]:row-[1/2] in-sidebar:max-sidebar:[&_label]:w-full',
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
