import type { ActionDispatch } from 'react'
import { updateDonationAmount } from '~/server/stripe/donation'
import type { Checkout, DonationAction, DonationState } from '../_types'

type CreateHandleUpdateProps = {
	state: DonationState
	checkout: Checkout
	dispatch: ActionDispatch<[action: DonationAction]>
}
export const createHandleUpdate =
	({ state, checkout, dispatch }: CreateHandleUpdateProps) =>
	async (change: DonationAction) => {
		switch (change.type) {
			case 'preset':
				await updateDonationAmount(checkout.sessionId, {
					...state,
					amount: Number(change.value),
				})

				dispatch(change)
				break
			case 'coverFee':
				await updateDonationAmount(checkout.sessionId, {
					...state,
					coverFee: change.value,
				})

				dispatch(change)
				break
		}
	}
