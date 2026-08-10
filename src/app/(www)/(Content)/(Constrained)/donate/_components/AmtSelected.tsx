import { type StripeCheckoutElementsValue } from '@stripe/react-stripe-js/checkout'
import type { StripeCheckoutCurrencyOption } from '@stripe/stripe-js'
import { useRef, useState, type ChangeEvent } from 'react'
import { Button } from '~/components/Button'
import { Input } from '~/components/Form/Input'
import { Label } from '~/components/Form/Label'
import { cn } from '~/lib'
import { updateDonationAmount } from '~/server/stripe/donation'
import { CURRENCIES, MIN_MAX } from '../_lib/constants'
import { formatMoney } from '../_lib/formatMoney'
import { isInBounds } from '../_lib/is'
import { donationReducer } from '../_lib/state'
import type { CurrencyCode, DonationAction, StateProp } from '../_types'
import { Err } from './Err'
import { DonationOver1K } from './OtherDonations'
import { CheckoutSection, LgLabel } from './PrimitiveEls'

const handleReduce = (i: number, final: number[][], current: number) => {
	i % 2 == 0 ? final.push([current]) : final[final.length - 1].push(current)
	return final
}

export const AmtSelect = ({
	state,
	live,
	conversions,
}: {
	state: StateProp
	live: StripeCheckoutElementsValue
	conversions?: StripeCheckoutCurrencyOption[]
}) => {
	const timer = useRef<ReturnType<typeof setTimeout>>(null)

	const { amount, custom } = state.get

	const handleUpdate = async (change: DonationAction) => {
		state.set(change)
		const next = donationReducer(state.get, change)
		if (next.amount < MIN_MAX.MIN_AMOUNT) return

		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(
			async () => {
				const res = await live
					.runServerUpdate(() => updateDonationAmount(live.id, next))
					.catch((e: Error) => ({ type: 'error' as const, error: { message: e.message } }))

				if (res.type === 'error') console.error('donation sync failed:', res.error.message)
			},
			change.type === 'custom' ? 500 : 0
		)
	}

	const { currency, symbol, rate } = (() => {
		if (conversions) {
			const newData = conversions[0]
			return {
				currency: newData.currency as CurrencyCode,
				rate: newData.currencyConversion?.fxRate ?? 1,
				symbol: newData.amount.replace(/[\d\.,]/g, ''),
			}
		}
		return {
			currency: state.get.currency,
			rate: 1,
			symbol: CURRENCIES[state.get.currency].symbol,
		}
	})()

	return (
		<CheckoutSection className='mt-2'>
			<LgLabel>Donation Amount</LgLabel>
			<div className='flex flex-col content-stretch gap-3'>
				<div className='mx-auto flex w-full flex-col items-center justify-center gap-x-4 gap-y-4'>
					{[1000, 2500, 5000, 10000]
						.reduce((final, current, i) => handleReduce(i, final, current), [] as number[][])
						.map(grp => (
							<Grp
								rate={rate}
								key={grp[0]}
								grp={grp}
								amount={amount}
								custom={custom}
								handleUpdate={handleUpdate}
								currency={currency}
							/>
						))}
					<CustomAmount
						symbol={symbol}
						custom={custom}
						handleUpdate={handleUpdate}
					/>
					<Err
						className='-mt-2 px-2 text-end text-xs font-medium tracking-wide uppercase italic'
						err={!isInBounds(amount)}
						message={`Donations must be between ${formatMoney(MIN_MAX.MIN_AMOUNT * rate, currency)} and ${formatMoney(MIN_MAX.MAX_AMOUNT * rate, currency)}`}
					/>
				</div>

				{/* 
				TODO: Implement later on
				{currency != 'eur' && (
					<CoverFee
						coverFee={coverFee}
						fee={fee}
						currency={currency}
						handleUpdate={handleUpdate}
					/>
				)} */}
			</div>
		</CheckoutSection>
	)
}

const CustomAmount = ({
	handleUpdate,
	symbol,
	custom,
}: {
	symbol: string
	custom: string
	handleUpdate: (change: DonationAction) => Promise<void>
}) => {
	const [minMax, setMinMax] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target

		if (Number(value) > MIN_MAX.MAX_AMOUNT / 100) {
			setMinMax(true)
		} else {
			handleUpdate({ type: 'custom', value: e.target.value })
			setMinMax(false)
		}
	}

	return (
		<>
			{minMax && <DonationOver1K />}
			<Label
				className='relative flex w-full items-center justify-center'
				inputMode='decimal'>
				<span className='absolute left-0 pl-2 text-sm font-semibold opacity-75'>
					OTHER: <span className='pl-1 font-normal opacity-75'>{symbol}</span>
				</span>
				<Input
					className='pl-20'
					type='number'
					min={MIN_MAX.MIN_AMOUNT / 100}
					step='0.01'
					inputMode='decimal'
					value={custom}
					onChange={handleChange}
					placeholder='0.00'
				/>
			</Label>
		</>
	)
}

// const CoverFee = ({
// 	coverFee,
// 	fee,
// 	currency,
// 	handleUpdate,
// }: {
// 	coverFee: boolean
// 	fee: number
// 	currency: CurrencyCode
// 	handleUpdate: (change: DonationAction) => Promise<void>
// }) => (
// 	<Label className='text-muted mt-4 basis-full text-sm'>
// 		<Checkbox
// 			className='content-start'
// 			checked={coverFee}
// 			onCheckedChange={v => handleUpdate({ type: 'coverFee', value: v === true })}
// 		/>
// 		<span className='block text-balance'>
// 			Cover the estimated {FEE.PERCENT}% processing fee
// 			{fee > 0 && ` (${formatMoney(fee, currency)})`}.
// 		</span>
// 	</Label>
// )

const Grp = ({
	rate,
	grp,
	amount,
	custom,
	handleUpdate,
	currency,
}: {
	rate: number
	grp: number[]
	amount: number
	custom: string
	handleUpdate: (change: DonationAction) => Promise<void>
	currency: CurrencyCode
}) => {
	return (
		<div
			key={grp[0]}
			className='flex w-full flex-1 flex-wrap gap-2 first:mt-4'>
			{grp.map(value => {
				const isSelected = amount === value && !custom
				return (
					<Button
						key={value}
						type='button'
						variant={isSelected ? 'wYellow' : 'ghost'}
						onClick={() => handleUpdate({ type: 'preset', value: value })}
						aria-pressed={isSelected}
						className={cn(
							'flex w-full flex-1 basis-20 flex-col items-center justify-center',
							!isSelected
								&& 'hover:text-hml-red hover:dark:text-hml-yellow-500 outline-1 outline-current/20'
						)}>
						<span className='text-2xl'>{formatMoney(value * rate, currency)}</span>
						<span className='ml-1 text-[0.7rem] italic opacity-65'>
							{formatMoney(value, 'eur')}
						</span>
					</Button>
				)
			})}
		</div>
	)
}
