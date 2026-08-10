import type { CurrencyCode } from '../_types'
import { CURRENCIES, FEE } from './constants'

/**
 * What to add so the organisation nets the donor's intended amount after Stripe takes its cut. Solving `net = (net + fee) - (pct * total + fixed)` for the total gives `total = (net + fixed) / (1 - pct)`; the fee is the difference.
 */

export const processingFee = (amount: number, currency: CurrencyCode) =>
	Math.round((amount + CURRENCIES[currency].fixedFee) / (1 - FEE.PERCENT / 100) - amount)
