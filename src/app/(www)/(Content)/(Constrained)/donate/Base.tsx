'use client'

import { CheckoutElementsProvider } from '@stripe/react-stripe-js/checkout'
import { useMemo, useReducer, useState } from 'react'
import { PageEyebrow, PageHeading, PageHGroup, PageSubtitle } from '~/components/Structure/Page'
import {
	Section,
	SectionHeading,
	SectionHGroup,
	SectionSubtitle,
} from '~/components/Structure/Section'
import { InlineLink } from '~/components/Text'
import type { DonationResult } from '~/server/stripe/donation'
import { Form } from './_components/Form'
import { DonationBankTransfer } from './_components/OtherDonations'
import { useStripeTheme } from './_hooks/useStripeTheme'
import { donationReducer, initialDonationState } from './_lib/state'
import { stripePromise } from './_lib/stripePromise'
import type { Checkout, Session } from './_types'

export const Base = ({ checkoutInit }: { checkoutInit: Checkout }) => {
	// #region ! ---------- STATE ----------
	const [state, dispatch] = useReducer(donationReducer, initialDonationState)
	const [checkout] = useState(checkoutInit)
	const [result, setResult] = useState<DonationResult | null>(null)
	const [session, updateSession] = useState<Session>({
		step: 0,
		error: null,
	})
	const [submitting, setSubmitting] = useState(false)

	// #endregion ! --------------------

	// #region ! ---------- RESOLVERS ----------
	const appearance = useStripeTheme()
	const clientSecret = useMemo(() => Promise.resolve(checkout.clientSecret), [checkout])

	// #endregion ! --------------------

	return (
		<CheckoutElementsProvider
			key={checkout.sessionId}
			stripe={stripePromise}
			options={{
				clientSecret,
				adaptivePricing: { allowed: true },
				elementsOptions: {
					appearance,
				},
			}}>
			<Section className='top-20 max-h-min flex-1 md:sticky md:basis-1/2 lg:top-16 lg:z-99 xl:top-4'>
				<PageHGroup>
					<PageEyebrow>Donate</PageEyebrow>
					<PageHeading>Help Us Continue</PageHeading>
					<PageSubtitle>
						Your gift has the power to be felt for a lifetime and throughout generations. On behalf
						of our volunteers and the Help Me Leave community, thank you for your generosity!
					</PageSubtitle>
				</PageHGroup>

				<Section>
					<SectionHGroup>
						<SectionHeading>Have Questions?</SectionHeading>
						<SectionSubtitle>
							E-Mail Us at{' '}
							<InlineLink href='mailto:donations@helpmeleave.us'>
								Donations@helpmeleave.us
							</InlineLink>
						</SectionSubtitle>
					</SectionHGroup>

					<DonationBankTransfer />
				</Section>
			</Section>
			<Form
				result={result}
				onComplete={(donation: DonationResult) => {
					setResult(donation)
					updateSession({ step: 2, error: null })
				}}
				state={{
					get: state,
					set: dispatch,
				}}
				session={{
					get: session,
					set: updateSession,
				}}
				submitting={{
					get: submitting,
					set: setSubmitting,
				}}
			/>
		</CheckoutElementsProvider>
	)
}
