import type { StripeCheckoutSession } from '@stripe/stripe-js'

export const DonationSummary = ({
	checkout,
	frequencyLabel,
}: {
	checkout: StripeCheckoutSession
	frequencyLabel: string
}) => {
	const rows = [
		...checkout.lineItems.map(item => ({
			label: item.name,
			value: item.total.amount,
		})),
		{ label: 'Giving Frequency', value: frequencyLabel == 'One Time' ? 'x 1' : frequencyLabel },
	]

	return (
		<dl className='border-muted/20 flex flex-col gap-2 border-t pt-4 text-sm'>
			{rows.map(({ label, value }) => (
				<div
					key={label}
					className='flex justify-between gap-4'>
					<dt className='text-muted font-semibold'>{label}</dt>
					<dd className='tabular-nums'>{value}</dd>
				</div>
			))}

			<dl className='border-muted/30 mt-2 flex justify-between gap-4 border-t pt-3 text-base font-semibold'>
				<dt>Donation Total</dt>
				<dd className='tabular-nums'>{checkout.total.total.amount}</dd>
			</dl>

			{/* For a subscription the total above is what's due today; this is the committed amount each period, which can differ if it's prorated. */}
			{checkout.recurring?.dueNext && (
				<div className='text-muted flex justify-between gap-4 text-xs'>
					<dt>Then {checkout.recurring.interval}ly</dt>
					<dd className='tabular-nums'>{checkout.recurring.dueNext.total.amount}</dd>
				</div>
			)}
		</dl>
	)
}
