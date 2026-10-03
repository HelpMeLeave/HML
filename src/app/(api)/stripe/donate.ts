'use server'

import { stripe } from '@/app/(api)/stripe'
import { formatCharged } from '@/app/(api)/stripe/_lib/utils'
import type { DonationResult } from '@/app/(api)/stripe/_types/SessionData'

export async function getDonationResult(sessionId: string): Promise<DonationResult> {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent.latest_charge', 'invoice', 'line_items'],
  })

  const intent = typeof session.payment_intent === 'object' ? session.payment_intent : null
  const charge = intent && typeof intent.latest_charge === 'object' ? intent.latest_charge : null
  const invoice = typeof session.invoice === 'object' ? session.invoice : null
  const transactionId = intent && intent.id
  const email = invoice && invoice.customer_email

  return {
    transactionId,
    lineItems:
      session.line_items?.data.map((li) => ({
        name: li.description ?? '',
        amount: formatCharged(li.amount_total, session.currency),
      })) ?? [],
    email,
    paid: session.payment_status === 'paid',
    pending: session.status === 'complete' && session.payment_status === 'unpaid',
    total: formatCharged(session.amount_total, session.currency),
    receiptUrl: charge?.receipt_url ?? invoice?.hosted_invoice_url ?? null,
  }
}
