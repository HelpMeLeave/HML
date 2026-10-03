import type { SupportWizardSelect } from '@/payload-types'
import { getPayload } from '@/server/getPayload'
import type { BasePayload, PayloadRequest } from 'payload'

export const getWizardModal = async ({
  payload,
  req,
}: {
  payload?: BasePayload
  req?: PayloadRequest
}) => {
  if (!payload) {
    if (!req) {
      payload = await getPayload()
    } else {
      payload = req.payload
    }
  }

  const { modals } = await payload.findGlobal({
    slug: 'support-wizard',
    select: {
      modals: true,
    } as Partial<SupportWizardSelect<true>>,
  })

  return modals
}
