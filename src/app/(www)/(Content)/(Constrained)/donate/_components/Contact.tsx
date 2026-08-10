'use client'

import type { ChangeEvent, Dispatch, HTMLInputAutoCompleteAttribute } from 'react'
import { Checkbox, Input, Label } from '~/components/Form'
import type { DonationAction, StateProp } from '../_types'
import { CheckoutSection, LgLabel } from './PrimitiveEls'

const Field = ({
	action,
	dispatch,
	autocomplete,
	label,
	required = false,
	inputType = 'text',
}: {
	autocomplete: HTMLInputAutoCompleteAttribute
	action: Exclude<DonationAction, 'value'>
	dispatch: Dispatch<DonationAction>
	label: string
	required?: boolean
	inputType?: Props<'input'>['type']
}) => {
	const { type, key, value } = 'key' in action ? action : {}

	const handle = (e: ChangeEvent<HTMLInputElement>) => {
		const obj = {
			type,
			value: e.target.value,
		}
		if (key) Object.assign(obj, { key: key })

		dispatch(obj as DonationAction)
	}

	return (
		type && (
			<Label
				text={label}
				aria-required={required}
				className='flex-1 flex-col items-start gap-1.5'>
				<Input
					type={inputType}
					required={required}
					autoComplete={autocomplete}
					value={value}
					onChange={handle}
					className='focus-visible:ring-hml-red/50 focus-visible:dark:ring-hml-yellow-500/50 focus-visible:border-hml-red focus-visible:dark:border-hml-yellow'
				/>
			</Label>
		)
	)
}

export const Contact = ({
	state: {
		get: { firstName, lastName, newsletter, email },
		set,
	},
}: {
	state: StateProp
}) => {
	return (
		<CheckoutSection className='mt-2'>
			<div className='flex flex-col gap-4'>
				<LgLabel>Contact</LgLabel>
				<div className='flex flex-wrap gap-4 *:basis-50'>
					<Field
						label='First Name'
						action={{
							type: 'field',
							key: 'firstName',
							value: firstName,
						}}
						dispatch={set}
						autocomplete='given-name'
						required
					/>
					<Field
						label='Last Name'
						action={{
							type: 'field',
							key: 'lastName',
							value: lastName,
						}}
						autocomplete='family-name'
						dispatch={set}
					/>
				</div>
				<Field
					autocomplete='email'
					required={true}
					label='E-Mail'
					action={{
						key: 'email',
						value: email,
						type: 'field',
					}}
					inputType='email'
					dispatch={set}
				/>
				<p className='text-muted mb-4 w-full text-center text-sm italic'>
					We are committed to maintaining your privacy and will never share your information with
					any third parties.
				</p>

				<Label className='text-muted *:click w-full text-sm'>
					<Checkbox
						checked={newsletter}
						className='focus-visible:ring-hml-red/50 focus-visible:dark:ring-hml-yellow-500/50 focus-visible:border-hml-red focus-visible:dark:border-hml-yellow'
						onCheckedChange={v => set({ type: 'newsletter', value: v === true })}
					/>
					<span>Sign me up for HML emails to stay informed about our work.</span>
				</Label>
			</div>
		</CheckoutSection>
	)
}
