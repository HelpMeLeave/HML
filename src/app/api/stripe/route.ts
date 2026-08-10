import type Stripe from 'stripe'
import { headers } from 'next/headers'
import { env } from '~/env'
import { stripe } from '~/server/stripe'

const subscribeDonor = async (session: Stripe.Checkout.Session) => {
	if (session.metadata?.newsletter_opt_in !== 'true') return

	const email = session.customer_details?.email
	if (!email) return

	const metadata = { newsletter_opt_in: 'true' }
	const name = session.customer_details?.name ?? undefined

	const id =
		typeof session.customer === 'string' ? session.customer
		: (await stripe.customers.list({ email, limit: 1 })).data[0]?.id

	if (id) await stripe.customers.update(id, { metadata, name })
	else await stripe.customers.create({ email, name, metadata })
}

export async function POST(req: Request) {
	const body = await req.text()
	const signature = (await headers()).get('stripe-signature')

	if (!signature) return new Response('Missing stripe-signature', { status: 400 })
	if (!env.STRIPE_WEBHOOK_SECRET) {
		return new Response('STRIPE_WEBHOOK_SECRET is not configured', { status: 500 })
	}

	let event
	try {
		event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
	} catch (e: unknown) {
		return new Response(`Webhook Error: ${(e as Error).message}`, { status: 400 })
	}

	switch (event.type) {
		/** Completion isn't payment — delayed methods land here as `unpaid` and settle later via async_payment_succeeded. */
		case 'checkout.session.completed':
		case 'checkout.session.async_payment_succeeded': {
			const session = event.data.object
			if (session.payment_status !== 'paid') break
			console.log(`💰 Donation confirmed: ${session.id} (${session.mode})`)
			await subscribeDonor(session).catch((e: Error) =>
				console.error('newsletter opt-in failed:', session.id, e.message)
			)
			break
		}
		case 'checkout.session.async_payment_failed': {
			const session = event.data.object
			console.log(`⚠️ Donation failed to settle: ${session.id}`)
			break
		}
		// Each renewal of a recurring donation.
		case 'invoice.paid': {
			const invoice = event.data.object
			console.log(`🔁 Recurring donation renewed: ${invoice.id}`)
			break
		}
		case 'invoice.payment_failed': {
			const invoice = event.data.object
			console.log(`⚠️ Recurring donation failed: ${invoice.id}`)
			break
		}
	}

	return new Response(null, { status: 200 })
}
