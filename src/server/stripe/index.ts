import 'server-only'
import Stripe from 'stripe'
import { env } from '~/env'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	// @ts-expect-error preview version
	apiVersion: '2026-07-29.preview',
	typescript: true,
})
