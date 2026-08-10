import { PRODUCTS } from '@/(www)/(Content)/(Constrained)/_donate/_lib/products'
import { stripe } from '~/server/stripe'

export type DonationType = 'ot' | 'recur'

const getItem = (priceId: string, typ: DonationType) => {
	const prefix = PRODUCTS[typ]?.[priceId]
	if (!prefix) throw new Error(`Unknown donation option: ${typ}/${priceId}`)

	return prefix + priceId
}

export async function createCheckoutSession({
	priceId,
	typ,
}: {
	priceId: string
	typ: DonationType
}) {
	const item = getItem(priceId, typ)

	const session = await stripe.checkout.sessions.create({
		ui_mode: 'elements',
		mode: 'subscription',
		line_items: [{ price: item, quantity: 1 }],
		return_url: `/donate/return?session_id={CHECKOUT_SESSION_ID}`,
		integration_identifier: 'hml-donate-kqvxmzrt',
	})

	if (!session.client_secret) {
		throw new stripe.errors.StripeInvalidClientError()
	}

	return { clientSecret: session.client_secret }
}
