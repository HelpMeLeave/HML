'use client'

import { FieldLabel } from '@/_components/blocks/Form/_components/Field'
import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
// This is the second static path into Component.tsx (the other was Signature/Render.tsx). renderField.tsx is reachable from pageConverters, so this import alone kept Payload's btn/tooltip/icon/confirmation-modal SCSS (~16KB) linked on every [...slug] page.
// Same dynamic() split as Render.tsx; ssr: false because react-signature-canvas needs a real DOM.
import type { SignatureData } from '@/_components/blocks/Signature/types'
import type { FormFieldSignature } from '@/payload-types'
import type { AnyFieldApi } from '@tanstack/react-form'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const SignatureBlockComponent = dynamic(
  () => import('@/_components/blocks/Signature/Component').then((m) => m.SignatureBlockComponent),
  { ssr: false }
)

const SignaturePad = ({ field, required }: { field: AnyFieldApi; required?: boolean | null }) => {
  const [signature, setSignature] = useState<SignatureData>({
    url: (field.state.value as string) ?? '',
    points: [],
  })

  const handleSetData = (data: SignatureData['url'] | SignatureData['points']) => {
    if (typeof data == 'string') {
      setSignature((prev) => ({ ...prev, url: data }))
      field.handleChange(data)
    } else {
      setSignature((prev) => ({ ...prev, points: data }))
    }
  }

  return (
    <div className='form-field basis-full'>
      <FieldLabel
        name='signature'
        label='Signature'
        required={required}
      />
      <SignatureBlockComponent
        data={signature}
        setDataAction={handleSetData}
      />
      {field.state.meta.isTouched && field.state.meta.errors[0] != null && (
        <p className='mt-0.5 text-sm text-red-400'>{String(field.state.meta.errors[0])}</p>
      )}
    </div>
  )
}

export const SignatureFieldComponent = (props: FormFieldSignature) => {
  const form = useFormContext()
  return (
    <form.Field
      name='signature'
      validators={buildValidators(props)}>
      {(field) => (
        <SignaturePad
          field={field}
          required={props.required}
        />
      )}
    </form.Field>
  )
}
