import { env } from '@/env'
import 'server-only'
import Stripe from 'stripe'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-10-28.endive',
  typescript: true,
  appInfo: {
    name: 'Help Me Leave',
    url: env.NEXT_PUBLIC_BASE_URL,
  },
})
