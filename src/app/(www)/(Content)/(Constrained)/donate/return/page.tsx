import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDonationResult } from '~/server/stripe/donation'
import { Confirmation } from '../_components/Confirmation'

export const metadata: Metadata = {
	title: 'Thank you',
	description: 'Your donation to Help Me Leave.',
}

/** The fallback surface. Cards confirm in place via `redirect: 'if_required'` and never reach here — this is where iDEAL, Bancontact, SEPA and redirecting 3DS challenges land, so it renders the same Confirmation the stepper does. */
const Page = async ({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) => {
	const { session_id } = await searchParams
	if (!session_id) notFound()

	const result = await getDonationResult(session_id)

	return <Confirmation result={result} />
}

export default Page
