'use client'

import { CheckboxFieldComponent } from '@/_components/blocks/Form/CheckboxField'
import { EmailFieldComponent } from '@/_components/blocks/Form/EmailField'
import type { ReactFormExtendedApi } from '@tanstack/react-form'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { useContext } from 'react'

const { fieldContext, formContext } = createFormHookContexts()

// Our form values are runtime-typed (Payload form fields), so the data shape is
// Record<string, unknown> rather than a static interface. All 11 validator params are
// undefined because form-level validators are not used — validation is per-field only.
type FormValues = Record<string, unknown>
export type FormContextApi = ReactFormExtendedApi<
  FormValues,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined
>

export const useFormContext = (): FormContextApi => useContext(formContext) as FormContextApi

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    CheckboxFieldComponent,
    EmailFieldComponent,
  },
  formComponents: {},
})
