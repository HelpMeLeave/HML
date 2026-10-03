import type { CurrencyCode } from '../_types'

/**
 * Fixed to en-US, and `symbol` rather than `narrowSymbol`, so CAD and AUD render as "CA$"/"A$". Formatting each in its own locale would render both as a bare "$", indistinguishable from USD.
 *
 * `currency` is widened past CurrencyCode because Adaptive Pricing can present
 * a currency we never listed — the display currency comes from Stripe, not from
 * CURRENCIES. Intl handles any ISO 4217 code; the union keeps autocompletion
 * for the ones we charge in.
 */
export const formatMoney = (minorUnits: number, currency: CurrencyCode | (string & {})) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    currencyDisplay: 'symbol',
  }).format(minorUnits / 100)
