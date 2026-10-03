import { stripe } from '@/app/(api)/stripe'
import { NoPaymentIntentError } from '@/app/(api)/stripe/webhook/_errors'
import { recordDonation as writeDonation } from '@/app/(api)/stripe/webhook/_lib'
import { env } from '@/env'
import { getPayload } from '@/server/getPayload'
import { type NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'

/** Stripe signs the exactbytes it sent, so the body is read as raw text and never parsed before verification. */

const verify = async (req: NextRequest) => {
  const signature = req.headers.get('stripe-signature')
  if (!signature) throw new Error('Missing stripe-signature header')

  // constructEventAsync rather than constructEvent: the sync version needs node's crypto and throws anywhere the route is evaluated off the node runtime
  return await stripe.webhooks.constructEventAsync(
    await req.text(),
    signature,
    env.STRIPE_WEBHOOK_SECRET
  )
}

export const recordDonation = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent.latest_charge'],
  })

  const intent = typeof session.payment_intent == 'object' ? session.payment_intent : null
  if (!intent) throw new NoPaymentIntentError(sessionId)

  const payload = await getPayload()

  // no beginTransaction/commit pair: writeDonation is a single statement, so postgres makes it atomic on its own and there is no transaction left open on an early exit
  await writeDonation({
    payload,
    session,
    paymentId: intent.id,
    receipt:
      typeof intent.latest_charge == 'object' ? (intent.latest_charge?.receipt_url ?? null) : null,
    // Stripe counts in minor units end to end, but donations.amount is major: CurrencyField renders it with step 0.01 and the Cell only does toFixed(2), so 2500 would land in the admin as €2500.00 instead of €25.00
    amount: session.amount_total == null ? null : session.amount_total / 100,
  })
}

export const POST = async (req: NextRequest) => {
  let event: Stripe.Event
  try {
    event = await verify(req)
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 })
  }

  if (event.type != 'checkout.session.completed') {
    return NextResponse.json({ ignored: event.type }, { status: 200 })
  }

  try {
    await recordDonation(event.data.object.id)
  } catch (e) {
    // drizzle wraps a driver failure in a generic "Failed query" and hides the postgres message on .cause, which is the only part that says what actually went wrong
    const cause = (e as Error).cause
    console.error('donation webhook failed:', e, cause ?? '')
    return NextResponse.json(
      { error: (e as Error).message, cause: cause instanceof Error ? cause.message : cause },
      { status: 500 }
    )
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
