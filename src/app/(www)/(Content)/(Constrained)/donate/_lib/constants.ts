import type { CurrencyCode } from '../_types'

export const MIN_MAX = {
	MAX_AMOUNT: 100000,
	MIN_AMOUNT: 100,
}

export const FEE = {
	/** Initial fee percentage prior to user location verification*/
	PERCENT: 4,
	// /** Product ID for fee. Goes on own invoice line to differentiate donation amount and fee paid by user*/
	// PRODUCT_ID: 'prod_V1LAbIlzeILvdN',
}

export const FREQUENCIES = [
	{ id: 'once', label: 'Give Once', summary: 'One Time' },
	// { id: 'monthly', label: 'Monthly', summary: 'Monthly' },
] as const

export const DEFAULT_CURRENCY: CurrencyCode = 'eur'

// /**
//  * Stripe products that already exist in the account — referenced rather than created inline so ad-hoc `product_data` doesn't clutter the product catalogue.
//  */
// export const DONATION_PRODUCTS: Record<Frequency, string> = {
// 	once: 'prod_V1hDRbLAtKVXsB',
// 	monthly: 'prod_V1C7BdfskIRy7Q',
// }

/**
 * preset buttons stay round numbers in every currency.
 *
 * The trade-off: EUR is this account's settlement currency, so anything else is converted by Stripe on settlement at roughly 2%, borne by the organisation. The alternative — always charging EUR and letting Adaptive Pricing present a converted local price — costs nothing but can only ever show a donor in the US something like "$54.23", never a clean $50.
 *
 * `presets` and `fixedFee` are in each currency's own minor units.
 */
export const CURRENCIES = {
	eur: {
		symbol: '€',
		label: 'EUR',
		presets: [1000, 2500, 5000, 10000],
		fixedFee: 25,
	},
	usd: {
		symbol: '$',
		label: 'USD',
		presets: [1000, 2500, 5000, 10000],
		fixedFee: 30,
	},
	gbp: {
		symbol: '£',
		label: 'GBP',
		presets: [1000, 2500, 5000, 10000],
		fixedFee: 20,
	},
	cad: {
		symbol: 'CA$',
		label: 'CAD',
		presets: [1500, 3500, 7000, 14000],
		fixedFee: 30,
	},
	aud: {
		symbol: 'A$',
		label: 'AUD',
		presets: [1500, 3500, 7000, 14000],
		fixedFee: 30,
	},
} as const

export const STEPS = [
	{
		name: 'Donation Details',
		href: '#',
	},
	{
		name: 'Payment',
		href: '#',
	},
	{
		name: 'Confirmation',
		href: '#',
	},
]
