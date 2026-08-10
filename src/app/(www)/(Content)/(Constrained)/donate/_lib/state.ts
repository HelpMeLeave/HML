import type { CurrencyCode, DonationAction, DonationState } from '../_types'
import { CURRENCIES } from './constants'

/** Second preset — the session needs a real amount at creation time. */

export const startingAmount = (currency: CurrencyCode) => CURRENCIES[currency].presets[1]

export const initialDonationState: DonationState = {
	frequency: 'once',
	currency: 'eur',
	amount: CURRENCIES['eur'].presets[1],
	custom: '',
	coverFee: false,
	firstName: '',
	lastName: '',
	newsletter: false,
	email: '',
}

export const donationReducer = (state: DonationState, action: DonationAction): DonationState => {
	switch (action.type) {
		case 'frequency':
			return { ...state, frequency: action.value }

		case 'currency': {
			const tiers = CURRENCIES[state.currency].presets as readonly number[]
			const tier = state.custom ? -1 : tiers.indexOf(state.amount)

			return {
				...state,
				currency: action.value,
				amount: tier === -1 ? state.amount : CURRENCIES[action.value].presets[tier],
			}
		}

		case 'preset':
			return { ...state, amount: action.value, custom: '' }

		case 'custom': {
			const parsed = Number.parseFloat(action.value)
			return {
				...state,
				custom: action.value,
				amount: Number.isFinite(parsed) ? Math.round(parsed * 100) : state.amount,
			}
		}

		case 'coverFee':
			return { ...state, coverFee: action.value }

		case 'newsletter':
			return { ...state, newsletter: action.value }

		case 'field':
			return { ...state, [action.key]: action.value }
		default:
			return { ...state }
	}
}
