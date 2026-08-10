'use server'

import { MIN_MAX } from '@/(www)/(Content)/(Constrained)/donate/_lib/constants'
import { isCurrency, isFrequency, isInBounds } from '@/(www)/(Content)/(Constrained)/donate/_lib/is'
import { processingFee } from '@/(www)/(Content)/(Constrained)/donate/_lib/processingFee'
import type { CurrencyCode, Frequency } from '@/(www)/(Content)/(Constrained)/donate/_types'

import { headers } from 'next/headers'
import { env } from '~/env'
import { stripe } from '~/server/stripe'

export type DonationInput = {
	amount: number
	currency: string
	frequency: string
	coverFee: boolean
	email?: string
}

const origin = async () => {
	const h = await headers()
	return (
		h.get('origin') ?? `${env.NODE_ENV === 'development' ? 'http' : 'https'}://${h.get('host')}`
	)
}

/**
 * This is a public endpoint and the amount comes from the browser, so everything is re-validated here rather than trusted from the form.
 */
const validate = ({ amount, currency, frequency }: DonationInput) => {
	const minMax = { min: amount < MIN_MAX.MIN_AMOUNT, max: amount > MIN_MAX.MAX_AMOUNT }
	const err =
		!isCurrency(currency) ? `Unsupported currency: ${currency}`
		: !isFrequency(frequency) ? `Unsupported frequency: ${frequency}`
		: !isInBounds(amount) ?
			`${amount} too ${minMax.min ? 'low' : 'high'}. Amount must be between ${MIN_MAX.MIN_AMOUNT} and ${MIN_MAX.MAX_AMOUNT} cents`
		:	undefined

	if (!err) {
		return { currency: currency as CurrencyCode, frequency: frequency as Frequency }
	}
	throw new Error(err)
}

const createItem = ({
	amount,
	currency,
	frequency,
}: Pick<DonationInput, 'amount' | 'currency' | 'frequency'>) =>
	({
		price_data: {
			product: frequency == 'monthly' ? env.STRIPE_PRODUCT_MONTHLY : env.STRIPE_PRODUCT_ONCE,
			currency,
			unit_amount: amount,
		},
		quantity: 1,
	}) as const

const feeItem = (fee: number, currency: string) =>
	fee > 0 ?
		[
			{
				price_data: {
					product: env.STRIPE_PRODUCT_FEE,
					currency,
					unit_amount: fee,
				},
				quantity: 1,
			},
		]
	:	[]

export async function createDonationSession(input: DonationInput) {
	const { currency, frequency } = validate(input)
	const fee = input.coverFee ? processingFee(input.amount, currency) : 0

	const checkoutSession = stripe.checkout.sessions

	const session = await checkoutSession.create({
		ui_mode: 'elements',
		mode: frequency === 'monthly' ? 'subscription' : 'payment',
		line_items: [
			createItem({ amount: input.amount, currency: currency, frequency }),
			...feeItem(fee, currency ?? 'eur'),
		],

		...(input.email ? { customer_email: input.email } : {}),
		metadata: {
			donation_amount: String(input.amount),
			processing_fee: String(fee),
			fee_covered: String(input.coverFee),
			currency,
			frequency,
		},
		return_url: `${await origin()}/donate/return?session_id={CHECKOUT_SESSION_ID}`,
		integration_identifier: 'hml-donate-kqvxmzrt',
		adaptive_pricing: {
			enabled: true,
		},
		wallet_options: {
			link: {
				display: 'never',
			},
		},
	})

	if (!session.client_secret) {
		throw new Error(`Stripe returned no client secret for session ${session.id}`)
	}
	return {
		clientSecret: session.client_secret,
		sessionId: session.id,
		amount: input.amount,
		fee,
		error: null,
	}
}

/**
 * Changes the amount on a session that's already mounted. Driven from the client via `checkout.runServerUpdate`, which re-reads the session afterwards so the Payment
 * Element and totals refresh without being torn down.
 *
 * Only the amount can move this way. Currency is rejected by the API once the session exists ("all items must have pricing in the same currency") and frequency decides `mode`, which is fixed at creation — both of those need a new session.
 */
export async function updateDonationAmount(sessionId: string, input: DonationInput) {
	const { currency, frequency } = validate(input)
	const fee = input.coverFee ? processingFee(input.amount, currency) : 0

	await stripe.checkout.sessions.update(sessionId, {
		line_items: [
			createItem({ amount: input.amount, currency, frequency }),
			...feeItem(fee, currency),
		],
		metadata: {
			donation_amount: String(input.amount),
			processing_fee: String(fee),
			fee_covered: String(input.coverFee),
			currency,
			frequency,
		},
	})
}

/**
 * Contact details are entered after the session already exists, and the client SDK can't write metadata — so they're attached server-side just before confirming.
 *
 * Stripe captures the email and name itself; the newsletter opt-in is the part it has nowhere to put.
 */
export type DonationResult = {
	paid: boolean
	pending: boolean
	email: string | null
	total: string
	receiptUrl: string | null
	lineItems: { name: string; amount: string }[]
}

/** Formats whatever currency Stripe actually charged in, which may be a presentment currency outside CURRENCIES, so it can't go through formatMoney. */
const formatCharged = (minorUnits: number | null, currency: string | null) =>
	minorUnits == null || !currency ?
		''
	:	new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency.toUpperCase(),
			currencyDisplay: 'symbol',
		}).format(minorUnits / 100)

/** The receipt URL isn't on the session. One-time payments carry it on the Charge, subscriptions on the Invoice, so both are expanded and whichever exists wins. Either can still be null right after confirming, while the charge settles or the invoice finalizes. */
export async function getDonationResult(sessionId: string): Promise<DonationResult> {
	const session = await stripe.checkout.sessions.retrieve(sessionId, {
		expand: ['payment_intent.latest_charge', 'invoice', 'line_items'],
	})

	const intent = typeof session.payment_intent === 'object' ? session.payment_intent : null
	const charge = intent && typeof intent.latest_charge === 'object' ? intent.latest_charge : null
	const invoice = typeof session.invoice === 'object' ? session.invoice : null

	return {
		lineItems:
			session.line_items?.data.map(li => ({
				name: li.description ?? '',
				amount: formatCharged(li.amount_total, session.currency),
			})) ?? [],
		paid: session.payment_status === 'paid',
		pending: session.status === 'complete' && session.payment_status === 'unpaid',
		email: session.customer_details?.email ?? null,
		total: formatCharged(session.amount_total, session.currency),
		receiptUrl: charge?.receipt_url ?? invoice?.hosted_invoice_url ?? null,
	}
}

export async function attachDonorDetails(
	sessionId: string,
	details: { firstName?: string; lastName?: string; newsletter?: boolean }
) {
	await stripe.checkout.sessions.update(sessionId, {
		metadata: {
			first_name: details.firstName ?? '',
			last_name: details.lastName ?? '',
			newsletter_opt_in: String(details.newsletter ?? false),
		},
	})
}
