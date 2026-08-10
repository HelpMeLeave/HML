import { SectionHeading, SectionHGroup, SectionSubtitle } from '~/components/Structure/Section'
import { Bold, InlineLink, Text } from '~/components/Text'
import type { DonationResult } from '~/server/stripe/donation'
import { CheckoutSection } from './PrimitiveEls'

/** Rendered from two places: inline on the stepper's final step after a card confirms without redirecting, and on /donate/return when the payment method sent the donor away and back. Both pass the same shape from getDonationResult. */
export const Confirmation = ({ result }: { result: DonationResult }) => {
	const { paid, pending, email, total, receiptUrl } = result

	const texts =
		paid ?
			{
				title: 'Thank You',
				subtitle: true,
				body: (
					<>
						A receipt is on its way
						{email ?
							<>
								{' '}
								to <Bold>{email}</Bold>
							</>
						:	''}
						.
					</>
				),
			}
		: pending ?
			{
				title: 'Almost there',
				body: `We’ve got your donation of ${total} and it’s still settling. We’ll email you
					${email ? ` at ${email}` : ''} once it clears.`,
			}
		:	{
				title: 'Your donation didn’t go through',
				body: 'Nothing was charged. You’re welcome to try again.',
			}

	return (
		<CheckoutSection className='mt-2 gap-4'>
			<SectionHGroup>
				<SectionHeading
					data-paid={paid ? '' : undefined}
					className='data-paid:text-hml-red dark:data-paid:text-hml-yellow-500'>
					{texts.title}
				</SectionHeading>
				{texts.subtitle && (
					<SectionSubtitle>
						We are <em>eternally</em> grateful to anyone who chooses to support us! Your gift will
						help vulnerable people seek safety and build new lives.
					</SectionSubtitle>
				)}
			</SectionHGroup>

			<Text className='mt-2'>{texts.body}</Text>

			<div className='flex flex-wrap gap-3'>
				{receiptUrl && (
					<InlineLink
						className='text-lg'
						href={receiptUrl}
						target='_blank'
						rel='noopener noreferrer'>
						View your receipt
					</InlineLink>
				)}
				{!paid && !pending && <InlineLink href='/donate'>Back to donate</InlineLink>}
			</div>
		</CheckoutSection>
	)
}
