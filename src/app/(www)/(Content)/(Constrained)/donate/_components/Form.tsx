'use client'

import {
	CurrencySelectorElement,
	PaymentElement,
	useCheckoutElements,
} from '@stripe/react-stripe-js/checkout'
import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { Loading } from '~/components/Loading'
import { Section } from '~/components/Structure/Section'
import { Text } from '~/components/Text'
import {
	attachDonorDetails,
	getDonationResult,
	type DonationResult,
} from '~/server/stripe/donation'
import { FREQUENCIES, MIN_MAX } from '../_lib/constants'
import type { SessionProp, StateProp, SubmittingProp } from '../_types'
import {
	AmtSelect,
	Confirmation,
	Contact,
	DonationSummary,
	Err,
	StepWrapper,
} from './formComponents'
import { LgLabel } from './PrimitiveEls'

export const Form = ({
	onComplete,
	result,
	session,
	state,
	submitting,
}: {
	onComplete: (result: DonationResult) => void
	result: DonationResult | null
	session: SessionProp
	state: StateProp
	submitting: SubmittingProp
}) => {
	const checkoutState = useCheckoutElements()

	if (checkoutState.type === 'loading') return <Loading />
	if (checkoutState.type === 'error') {
		return (
			<Err
				err={checkoutState.type == 'error'}
				message={checkoutState.error.message}
			/>
		)
	}

	const { amount, frequency } = state.get

	const live = checkoutState.checkout
	const conversions = live.currencyOptions?.filter(f => f.currency == live.currency)

	const handleError = (message: string | null) => session.set({ ...session.get, error: message })

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		submitting.set(true)
		handleError(null)

		try {
			await attachDonorDetails(live.id, {
				firstName: state.get.firstName,
				lastName: state.get.lastName,
				newsletter: state.get.newsletter,
			})

			/**
			 * Required. Without ContactDetailsElement, Stripe has no email for the session, and it only accepts one via `customer_email` at creation, `updateEmail`, or `confirm({email})`. This route also validates the address, so a typo surfaces here rather than failing the charge.
			 */
			const emailCheck = await live.updateEmail(state.get.email)
			if (emailCheck.type === 'error') {
				handleError(emailCheck.error.message)
				return
			}

			const fullName = [state.get.firstName, state.get.lastName].filter(Boolean).join(' ').trim()
			if (fullName && live.billingAddress?.address.country) {
				const checkName = await live.updateBillingAddress({
					...live.billingAddress,
					name: fullName,
				})

				if (checkName.type == 'error') {
					handleError(checkName.error.message)
					return
				}
			}

			/**
			 * Attempts to keep user on page after confirmation, on failure will route user back to receipt retrieval on return
			 */
			const result = await live.confirm({ redirect: 'if_required' })
			if (result.type === 'error') {
				handleError(result.error.message)
				return
			}

			onComplete(await getDonationResult(live.id))
		} catch (e: unknown) {
			handleError((e as Error).message)
		} finally {
			submitting.set(false)
		}
	}

	return (
		<>
			<Section className='flex-1 basis-1/2 md:w-1/2'>
				<StepWrapper
					step={0}
					current={session.get.step}>
					<form
						onSubmit={handleSubmit}
						className='contents'>
						{/* <Frequency
							state={state.get}
							apply={(action: DonationAction) => {
								const next = donationReducer(state.get, action)
								state.set(action)
								void handleRebuild(next)
							}}
						/> */}
						<AmtSelect
							state={state}
							live={live}
							conversions={conversions}
						/>
						<Contact state={state} />
						<section className='mx-0 mt-2 flex flex-col gap-y-0'>
							<LgLabel>Payment Details</LgLabel>
							<div className='mx-0 mb-4'>
								<span className='my-1 mt-2 block text-sm font-semibold'>Preferred Currency</span>
								<CurrencySelectorElement />
							</div>
							<PaymentElement
								options={{
									wallets: {
										link: 'never',
									},
									layout: {
										type: 'tabs',
									},
								}}
							/>
							<Text className='text-muted-foreground mt-1 text-center text-xs leading-loose text-balance italic'>
								By providing your card information, you allow Help Me Leave Stichting to charge your
								card for the agreed upon frequency and amount, in accordance with their terms.
							</Text>

							<Text className='mt-6'>
								<DonationSummary
									checkout={live}
									frequencyLabel={FREQUENCIES.find(f => f.id === frequency)!.summary}
								/>
							</Text>

							<Err
								err={Boolean(session.get.error)}
								message={session.get.error ?? ''}
							/>
							<Button
								type='submit'
								variant='wYellow'
								className='mt-6 w-full'
								disabled={submitting.get || amount < MIN_MAX.MIN_AMOUNT}>
								{submitting.get ? 'Processing…' : 'Submit Donation'}
							</Button>
						</section>
					</form>
				</StepWrapper>
				<StepWrapper
					step={2}
					current={session.get.step}>
					{result && <Confirmation result={result} />}
				</StepWrapper>
			</Section>
		</>
	)
}

export function NextBtn(props: {
	disabledNext: boolean
	handleNextStep: (id?: number | undefined) => void
}) {
	return (
		<Button
			variant='ghost'
			className='text-hml-red dark:text-hml-yellow-300 group ml-auto flex items-center'
			disabled={props.disabledNext}
			aria-disabled={props.disabledNext}
			onClick={() => props.handleNextStep()}>
			<span className='text-2xl sm:text-lg'>Next</span>
			<Icon
				viewBox='3 3 18 18'
				IconName='ArrowRightIcon'
				className='group-hover:*:text-background ml-2 rounded-full transition-colors group-hover:bg-current sm:size-5'
			/>
		</Button>
	)
}
