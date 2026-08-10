import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib'
import { FREQUENCIES } from '../_lib/constants'
import type { DonationAction, DonationState, Frequency as FrequencyType } from '../_types'
import { CheckoutSection, LgLabel } from './PrimitiveEls'

const Btn = ({
	id,
	state,
	apply,
	summary,
}: {
	id: FrequencyType
	state: DonationState
	apply: (action: DonationAction) => void
	summary: string
}) => (
	<Button
		role='radio'
		key={id}
		aria-checked={state.frequency == id}
		type='button'
		variant={'ghost'}
		onClick={() => apply({ type: 'frequency', value: id })}
		aria-pressed={state.frequency === id}
		className={cn(
			'hover:text-hml-mulberry-500 dark:hover:text-hml-yellow flex w-full items-center justify-start gap-2 text-current transition-colors',
			id == state.frequency ? 'text-hml-red dark:text-hml-yellow-500' : 'text-inherit'
		)}>
		<span className='w-6 *:mx-auto'>
			{state.frequency == id && (
				<Icon
					IconName='CheckIcon'
					className='size-4'
				/>
			)}
		</span>
		<span>{summary} Donation</span>
	</Button>
)

export const Frequency = ({
	state,
	apply,
}: {
	state: DonationState
	apply: (action: DonationAction) => void
}) => {
	return (
		<CheckoutSection className='flex flex-row gap-y-0'>
			<LgLabel>Donation Type</LgLabel>
			<div className='flex w-full flex-row flex-wrap gap-3 max-sm:flex-1'>
				{FREQUENCIES.map(({ id, summary }) => (
					<Btn
						key={id}
						id={id}
						summary={summary}
						state={state}
						apply={apply}
					/>
				))}
			</div>
		</CheckoutSection>
	)
}
