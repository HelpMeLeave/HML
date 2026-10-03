'use server'

import { getPayload } from '@/server/getPayload'
import { initialFormState } from '@tanstack/react-form-nextjs'

type SubmitState = typeof initialFormState & { success?: boolean; serverError?: string }

export const submitFormAction = async (
  formId: number,
  _prevState: SubmitState,
  formData: FormData
): Promise<SubmitState> => {
  try {
    const raw = formData.get('_values')
    const values = JSON.parse(typeof raw === 'string' ? raw : '{}') as Record<string, unknown>
    const submissionData = Object.entries(values).map(([field, value]) => ({
      field,
      value: Array.isArray(value) ? value.join(', ') : String(value ?? ''),
    }))

    const payload = await getPayload()
    await payload.create({
      collection: 'form-submissions',
      data: { form: formId, submissionData },
      overrideAccess: true,
    })

    return { ...initialFormState, success: true }
  } catch (err) {
    const serverError = err instanceof Error ? err.message : 'Something went wrong.'
    return { ...initialFormState, serverError }
  }
}
