import type { Metadata } from 'next'
import { Page } from '~/components/Structure/Page'
import { createDonationSession } from '~/server/stripe/donation'
import { initialDonationState } from './_lib/state'

import { Base } from './Base'
import './style.css'

export const metadata: Metadata = {
	title: 'Donate',
	description:
		'Support Help Me Leave. Your gift helps vulnerable people seek safety and build new lives.',
}

const DonationsPage = async () => {
	const checkoutInit = await createDonationSession({
		amount: initialDonationState.amount,
		currency: initialDonationState.currency,
		frequency: initialDonationState.frequency,
		coverFee: initialDonationState.coverFee,
	})

	return (
		<Page
			className='md:px-0 lg:max-w-7xl'
			id='donate'>
			<div className='relative mx-auto flex w-full flex-col gap-8 md:flex-row'>
				<Base checkoutInit={checkoutInit} />
			</div>
		</Page>
	)
}

export default DonationsPage
