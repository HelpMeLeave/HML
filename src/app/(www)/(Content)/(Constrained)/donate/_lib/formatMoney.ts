import type { CurrencyCode } from '../_types'

/**
 * Fixed to en-US, and `symbol` rather than `narrowSymbol`, so CAD and AUD render as "CA$"/"A$". Formatting each in its own locale would render both as a bare "$", indistinguishable from USD.
 */
export const formatMoney = (minorUnits: number, currency: CurrencyCode) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency.toUpperCase(),
		currencyDisplay: 'symbol',
	}).format(minorUnits / 100)
