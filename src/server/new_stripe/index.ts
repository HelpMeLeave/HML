import 'server-only'
import Stripe from 'stripe'
import { env } from '~/env'

export const getStripe = new Stripe(env.STRIPE_SECRET_KEY)
