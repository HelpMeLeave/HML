'use server'

import { stripe } from '@/app/(api)/stripe'
import { createNewItem, validate } from '@/app/(api)/stripe/_lib/utils'
import type { InitSesionData } from '@/app/(api)/stripe/_types/SessionData'

export async function updateDonationAmount(
  sessionId: string,
  input: Partial<InitSesionData> & {
    currency: InitSesionData['currency']
    amount: InitSesionData['amount']
  }
) {
  const { currency } = validate(input)

  await stripe.checkout.sessions.update(sessionId, {
    line_items: [createNewItem({ amount: input.amount, currency })],
    metadata: {
      donation_amount: String(input.amount),
      currency,
    },
  })
}
