import type { InitSesionData } from '@/app/(api)/stripe/_types/SessionData'
import { MIN_MAX } from '@/app/(www)/(Content)/donate/_lib/constants'
import { isCurrency, isInBounds } from '@/app/(www)/(Content)/donate/_lib/is'
import type { CurrencyCode } from '@/app/(www)/(Content)/donate/_types'
import { env } from '@/env'

export const formatCharged = (minorUnits: number | null, currency: string | null) =>
  minorUnits == null || !currency ?
    ''
  : new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      currencyDisplay: 'symbol',
    }).format(minorUnits / 100)

export const createNewItem = (
  data: Partial<InitSesionData> & {
    currency: InitSesionData['currency']
    amount: InitSesionData['amount']
  }
) =>
  ({
    price_data: {
      product: env.STRIPE_PRODUCT_ONCE,
      currency: data.currency,
      unit_amount: data.amount,
    },
    quantity: 1,
  }) as const

export const validate = ({ amount, currency }: { amount: number; currency: string }) => {
  const minMax = {
    min: amount < MIN_MAX.MIN_AMOUNT,
    max: amount > MIN_MAX.MAX_AMOUNT,
  }
  const err =
    !isCurrency(currency) ? `Unsupported currency: ${currency}`
    : !isInBounds(amount) ?
      `${amount} too ${minMax.min ? 'low' : 'high'}. Amount must be between ${MIN_MAX.MIN_AMOUNT} and ${MIN_MAX.MAX_AMOUNT} cents`
    : undefined

  if (!err) {
    return {
      currency: currency as CurrencyCode,
    }
  }
  throw new Error(err)
}
