'use client'

import { FieldLabel } from '@/_components/blocks/Form/_components/Field'
import { buildValidators } from '@/_components/blocks/Form/_FormComponent/buildValidators'
import { useFormContext } from '@/_components/blocks/Form/_FormComponent/formHook'
import {
  MAX_UPLOAD_BYTES,
  resolveMimes,
  toAcceptAttr,
} from '@/_components/blocks/Form/_lib/fileTypes'
import { baseClass } from '@/_components/blocks/Form/TextField'
import { cn } from '@/lib/cn'
import type { FormFieldUpload } from '@/payload-types'
import type { AnyFieldApi } from '@tanstack/react-form'
import { useState } from 'react'

type UploadProps = FormFieldUpload & { formId?: number }

const MAX_MB = MAX_UPLOAD_BYTES / (1024 * 1024)

const UploadInput = ({ field, props }: { field: AnyFieldApi; props: UploadProps }) => {
  const { id, formId, label, required, allowedFileTypes } = props
  const name = `upload-${id}`
  const allowedMimes = resolveMimes(allowedFileTypes)

  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File | undefined) => {
    setError(null)

    if (!file) {
      field.handleChange('')
      setFileName(null)
      setStatus('idle')
      return
    }

    // Fast client-side pre-checks; the route handler re-validates authoritatively.
    if (file.size > MAX_UPLOAD_BYTES) {
      field.handleChange('')
      setStatus('error')
      setError(`File exceeds the ${MAX_MB}MB limit.`)
      return
    }
    if (allowedMimes.length && !allowedMimes.includes(file.type)) {
      field.handleChange('')
      setStatus('error')
      setError('File type is not allowed.')
      return
    }

    setFileName(file.name)
    setStatus('uploading')

    try {
      const body = new FormData()
      body.set('file', file)
      body.set('formId', String(formId ?? ''))
      body.set('blockId', String(id ?? ''))

      const res = await fetch('/api/form-upload', { method: 'POST', body })
      const data = (await res.json()) as { url?: string; id?: number; error?: string }
      if (!res.ok) throw new Error(data?.error ?? 'Upload failed.')

      field.handleChange(String(data.url ?? data.id))
      setStatus('done')
    } catch (err) {
      field.handleChange('')
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Upload failed.')
    }
  }

  const fieldError =
    field.state.meta.isTouched && field.state.meta.errors[0] != null ?
      String(field.state.meta.errors[0])
    : null

  return (
    <div className='form-field basis-full'>
      <FieldLabel
        name={name}
        label={label}
        required={required}
      />
      <div className='mt-2'>
        <input
          type='file'
          id={`field-${name}`}
          name={`field-${name}`}
          accept={toAcceptAttr(allowedFileTypes) || undefined}
          disabled={status === 'uploading'}
          className={cn(
            baseClass,
            'file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium'
          )}
          onChange={(e) => handleFile(e.currentTarget.files?.[0])}
          onBlur={field.handleBlur}
        />
      </div>
      {status === 'uploading' && (
        <p className='mt-0.5 text-sm text-grey-500'>Uploading {fileName}…</p>
      )}
      {status === 'done' && fileName && (
        <p className='mt-0.5 text-sm text-green-600'>Uploaded {fileName}</p>
      )}
      {(error ?? fieldError) && (
        <p className='mt-0.5 text-sm text-red-400'>{error ?? fieldError}</p>
      )}
    </div>
  )
}

export const UploadFieldComponent = (props: UploadProps) => {
  const form = useFormContext()
  return (
    <form.Field
      name={`upload-${props.id}`}
      validators={buildValidators(props)}>
      {(field) => (
        <UploadInput
          field={field}
          props={props}
        />
      )}
    </form.Field>
  )
}
