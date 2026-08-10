'use client'

import { InlineLink, Text } from '~/components/Text'
import { cn } from '~/lib'

export function DonationBankTransfer() {
	return (
		<Text>
			<h2
				className={cn(
					'z-auto flex w-full items-baseline gap-4',
					'transition-all hover:opacity-75',
					'text-hml-red dark:text-hml-grey text-2xl font-semibold tracking-tight text-pretty'
				)}>
				Make a Direct Bank Transfer
			</h2>
			<dl className='mx-6 grid max-w-max grid-cols-[auto_1fr] gap-x-4 *:text-sm *:odd:text-end *:odd:font-semibold'>
				<dt>Account Name:</dt> <dd>Help Me Leave Stichting</dd>
				<dt>IBAN:</dt> <dd>FR76 2763 3121 2904 9186 5658 583</dd>
				<dt>BIC Code:</dt> <dd>BUNQFRP2</dd>
			</dl>
		</Text>
	)
}

export const DonationOver1K = () => (
	<Text>
		<h2
			className={cn(
				'z-auto flex w-full items-baseline gap-4',
				'transition-all hover:opacity-75',
				'text-hml-red dark:text-hml-grey text-2xl font-semibold tracking-tight text-pretty'
			)}>
			Donations Over 1000
		</h2>
		Please email{' '}
		<InlineLink href='mailto:support@helpmeleave.us'>donations@helpmeleave.us</InlineLink>
	</Text>
)
