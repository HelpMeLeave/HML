import type { Dispatch, SetStateAction } from 'react'
import { createDonationSession } from '~/server/stripe/donation'
import type { Checkout, DonationState } from '../_types'

export type CreateRebuildProps = {
	request: RefObject<number>
	setCheckout: Dispatch<SetStateAction<Checkout>>
	handleError: (error: string | null) => void
}
export const createRebuild =
	({ request, setCheckout, handleError }: CreateRebuildProps) =>
	async (next: DonationState) => {
		const id = ++request.current

		try {
			const result = await createDonationSession({
				amount: next.amount,
				coverFee: next.coverFee,
				currency: next.currency,
				frequency: next.frequency,
			})
			if (id !== request.current) return
			setCheckout({ clientSecret: result.clientSecret, sessionId: result.sessionId })
			handleError(null)
		} catch (e: unknown) {
			if (id === request.current) handleError((e as Error).message)
		}
	}
