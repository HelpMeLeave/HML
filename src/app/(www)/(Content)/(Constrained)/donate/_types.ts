import type { StripeUseCheckoutElementsResult } from '@stripe/react-stripe-js/checkout'
import type { ActionDispatch, Dispatch, SetStateAction } from 'react'
import type { CURRENCIES } from './_lib/constants'

export type Checkout = {
	clientSecret: string
	sessionId: string
}

export type DonationState = {
	frequency: Frequency
	currency: CurrencyCode
	amount: number
	/** Raw text of the "Other" field; empty means a preset is selected. */
	custom: string
	coverFee: boolean
	firstName: string
	lastName: string
	newsletter: boolean
	email: string
}

export type DonationAction =
	| { type: 'frequency'; value: Frequency }
	| { type: 'currency'; value: CurrencyCode }
	| { type: 'preset'; value: number }
	| { type: 'custom'; value: string }
	| { type: 'coverFee'; value: boolean }
	| { type: 'newsletter'; value: boolean }
	| { type: 'field'; key: 'firstName' | 'lastName' | 'email'; value: string }
	| {
			type: 'conversion'
			value: Extract<StripeUseCheckoutElementsResult, { type: 'success' }>['checkout']['total']
	  }

export type Frequency = 'once' | 'monthly'
export type CurrencyCode = keyof typeof CURRENCIES

export type Step = {
	name: string
}

export type Session = {
	step: number
	error: string | null
}

export type SessionProp = {
	get: Session
	set: Dispatch<SetStateAction<Session>>
}

export type StateProp = {
	get: DonationState
	set: ActionDispatch<[action: DonationAction]>
}
export type SubmittingProp = {
	get: boolean
	set: ActionDispatch<[action: boolean]>
}
