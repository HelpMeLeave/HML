'use client'

import { buildDefaultValues } from '@/_components/blocks/Form/_FormComponent/buildDefaultValues'
import { Confirmation } from '@/_components/blocks/Form/_FormComponent/Confirmation'
import { submitFormAction } from '@/_components/blocks/Form/_FormComponent/formAction'
import { useAppForm } from '@/_components/blocks/Form/_FormComponent/formHook'
import { IntroMessage } from '@/_components/blocks/Form/_FormComponent/IntroMessage'
import { SubmitBtn } from '@/_components/blocks/Form/_FormComponent/SubmitBtn'
import { Wrapper } from '@/_components/blocks/Form/_FormComponent/Wrapper'
import type { Form } from '@/payload-types'
import { mergeForm } from '@tanstack/react-form'
import { initialFormState, useTransform } from '@tanstack/react-form-nextjs'
import { useRouter } from 'next/navigation'
import { type ReactNode, useActionState, useEffect } from 'react'

type SubmitState = typeof initialFormState & { success?: boolean; serverError?: string }

export const FormEl = ({
  redirect_url,
  confirmationMessage,
  confirmationType,
  introMessage,
  submitButtonLabel,
  fields,
  title,
  id,
  children,
}: { children: ReactNode } & Form) => {
  const router = useRouter()

  const [state, dispatch, isPending] = useActionState<SubmitState, FormData>(
    submitFormAction.bind(null, id),
    { ...initialFormState, success: false, serverError: undefined }
  )

  const formEl = useAppForm({
    defaultValues: buildDefaultValues(fields ?? []),
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
    onSubmit: async ({ value }) => {
      const fd = new FormData()
      fd.set('_values', JSON.stringify(value))
      dispatch(fd)
    },
  })

  useEffect(() => {
    if (state.success && confirmationType === 'redirect' && redirect_url) {
      router.push(redirect_url)
    }
  }, [confirmationType, redirect_url, router, state.success])

  const hasSubmitted = !!state.success

  return (
    <Wrapper title={title}>
      <IntroMessage content={introMessage} />
      <Confirmation
        isPending={isPending}
        hasSubmitted={hasSubmitted}
        confirmationMessage={confirmationMessage}
        confirmationType={confirmationType}
      />
      {state.serverError && <p className='text-red-500'>{state.serverError}</p>}
      {!hasSubmitted && (
        <formEl.AppForm>
          <form
            id={String(id)}
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              void formEl.handleSubmit()
            }}
            className='flex max-w-3xl flex-wrap gap-y-4'>
            {children}
            <SubmitBtn
              isSubmitting={formEl.state.isSubmitting}
              isPending={isPending}
              btnLabel={submitButtonLabel}
            />
          </form>
        </formEl.AppForm>
      )}
    </Wrapper>
  )
}
