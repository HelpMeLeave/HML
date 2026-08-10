'use client'

import { PaymentElement, useCheckoutElements } from '@stripe/react-stripe-js/checkout'
import { useState } from 'react'
import { Button } from '~/components/Button'
import { Loading } from '~/components/Loading'
import { PageEyebrow, PageHeading, PageHGroup } from '~/components/Structure/Page'
import { Section, SectionHeading, SectionHGroup } from '~/components/Structure/Section'
import { P } from '~/components/Text/P'

export const PaymentForm = () => {
	const checkoutState = useCheckoutElements()
	const [email, setEmail] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [submitting, setSubmitting] = useState(false)

	if (checkoutState.type === 'loading') return <Loading />

	if (checkoutState.type === 'error') {
		return (
			<p
				role='alert'
				className='text-hml-red dark:text-hml-red-300'>
				{checkoutState.error.message}
			</p>
		)
	}

	const { checkout } = checkoutState
	const { total, recurring } = checkout

	const amount = total.total.amount
	const cadence = recurring ? `${amount} / ${recurring.interval}` : amount

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		setSubmitting(true)
		setError(null)

		// Let Stripe validate the address before it's attached to the session.
		const emailResult = await checkout.updateEmail(email)
		if (emailResult.type === 'error') {
			setError(emailResult.error.message)
			setSubmitting(false)
			return
		}

		// On success the donor is redirected to the session's `return_url`; we only
		// get here when confirmation fails outright (declined card, etc.).
		const result = await checkout.confirm()
		if (result.type === 'error') setError(result.error.message)

		setSubmitting(false)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='mx-auto flex w-full flex-col gap-8 lg:flex-row'>
			<div className='basis-1/2'>
				<PageHGroup>
					<PageEyebrow>
						{recurring ? `${amount} / ${recurring.interval} Donation` : `Donation`}
					</PageEyebrow>
					<PageHeading className='sm:text-3xl'>Thank you for your support</PageHeading>
				</PageHGroup>
				<Section>
					<P></P>
					<P>
						Your gift has the power to be felt for a lifetime and throughout generations. On behalf
						of our volunteers and the Help Me Leave community, thank you for your generosity!
					</P>
				</Section>

				<Section className='mt-6'>
					<SectionHGroup>
						<SectionHeading className='text-hml-red dark:text-hml-grey text-2xl font-semibold tracking-tight text-balance'>
							Your {recurring ? 'support' : amount} makes a{' '}
							<span className='text-primary decoration-hml-red dark:decoration-hml-grey text-2xl italic underline'>
								real
							</span>{' '}
							difference
						</SectionHeading>
					</SectionHGroup>
				</Section>
			</div>
			<Section className='m-0 mt-12 max-w-full flex-1 p-0'>
				<PaymentElement
					options={{
						wallets: {
							link: 'never',
						},
						layout: {
							type: 'tabs',
							defaultCollapsed: true,
							radios: 'if_multiple',
						},
						fields: {
							card: {
								billingDetails: {
									email: 'auto',
									name: 'always',
								},
							},
							billingDetails: {
								email: 'auto',
							},
						},
					}}
				/>

				<label className='flex flex-col gap-1.5'>
					<span className='text-xs font-semibold tracking-wide uppercase'>Email</span>
					<input
						type='email'
						required
						autoComplete='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='you@example.com'
						className='p-Input-input p-Fieldset-input Input Input--empty p-Input-input--textRight p-Input-input--numeric'
					/>
				</label>

				{error && (
					<p
						role='alert'
						className='text-hml-red dark:text-hml-red-300 text-sm'>
						{error}
					</p>
				)}
				<Button
					type='submit'
					disabled={submitting || !checkout.canConfirm}>
					{submitting ? 'Processing…' : `Donate ${cadence}`}
				</Button>
			</Section>
		</form>
	)
}
