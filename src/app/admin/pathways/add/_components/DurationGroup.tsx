import {
	FormError,
	FormGroupError,
	SubSectionFieldset,
	SubSectionFieldsetDetails,
	SubSectionFieldsetLegend,
} from '@/admin/_components'
import { Checkbox, CheckboxField } from '@/admin/_components/_form/Checkbox'
import { Field, Input, InputGroup, Label, Select } from '@/admin/_components/catalyst'
import { timeOptionEls } from '@/admin/pathways/_lib/constants'
import type { ElPrismaProps, FieldElProps } from '@/admin/pathways/_lib/types'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'
import { toTitleCase } from '~/lib/text'
import { zMinMax } from '~/server/api/zod'

type Key = keyof Query['durations'] & keyof Query['query'] & keyof Query['errors']

// #region ! ---------- FNS ----------
const handleTimeChange = ({
	...props
}: {
	queryField: Key
	durationType: 'min' | 'max'
	seperateUOM: boolean
	value: string | number
	data: Query
	change: 'time' | 'unit'
}) => {
	const { queryField, durationType, seperateUOM, value, data, change } = props
	const newDuration = { ...data.durations[queryField] }
	const newQuery = { ...data.query[queryField] }

	if (change == 'unit') {
		if (seperateUOM) {
			newDuration[durationType] = Number(value)

			newQuery[durationType] =
				(newQuery[durationType] / data.durations[queryField][durationType])
				* newDuration[durationType]
		} else {
			newDuration.min = Number(value)
			newDuration.max = Number(value)
			newQuery.min = (newQuery.min / data.durations[queryField].min) * newDuration.min
			newQuery.max = (newQuery.max / data.durations[queryField].max) * newDuration.min
		}
	} else if (change == 'time') {
		newQuery[durationType] = Number(value) * newDuration[durationType]
	}

	const newData = { ...data }
	newData.durations[queryField] = newDuration
	newData.query[queryField] = newQuery

	const parsed = zMinMax({
		wholeNumberOnly: true,
	}).safeParse(newData.query[queryField])
	if (parsed.success) {
		Object.assign(newData.errors[queryField], {
			min: [],
			max: [],
			base: [],
		})
	} else {
		const fieldErrors = { min: [], max: [], base: [] } as {
			min: string[]
			max: string[]
			base: string[]
		}
		parsed.error.issues.forEach(issue => {
			// ! CL

			const pathKey = issue.path[0] as keyof typeof fieldErrors
			if (pathKey == 'min' || pathKey == 'max') {
				fieldErrors[pathKey].push(issue.message)
			} else {
				fieldErrors['base'].push(issue.message)
			}
		})
		Object.assign(
			newData.errors[queryField],
			{
				min: [],
				max: [],
				base: [],
			},
			fieldErrors
		)
	}

	return newData
}

const handleSeperateUOMChange = ({
	field,
	newStatus,
	data,
	handlePrisma,
}: {
	data: Query
	field: keyof Query['durations'] & keyof Query['query']
	newStatus: boolean
	handlePrisma: (data: Query) => void
}) => {
	const maxDuration =
		data.durations[field] && data.durations[field].max ? data.durations[field].max : 1
	const minDuration =
		data.durations[field] && data.durations[field].min ? data.durations[field].min : 1

	const newData = {
		...data,
		query: {
			...data.query,
			[field]: {
				...data.query[field],
				max:
					newStatus ?
						data.query[field]?.max
					:	((data.query[field]?.max ?? 0) / maxDuration) * minDuration,
			},
		},
		durations: {
			...data.durations,
			[field]: {
				...data.durations[field],
				max: newStatus ? maxDuration : minDuration,
				separate: newStatus,
			},
		},
	}

	handlePrisma(newData)
}
// #endregion ! --------------------

export const DurationGroup = ({
	data,
	handlePrisma,
	fieldKey,
	description,
	legend,
}: ElPrismaProps & {
	fieldKey: Key
	description: string
	legend: string
}) => {
	const separate = data.durations[fieldKey].separate
	const isNA = data.query[fieldKey].na

	return (
		<SubSectionFieldset>
			<SubSectionFieldsetLegend description={description}>{legend}</SubSectionFieldsetLegend>
			<SubSectionFieldsetDetails className='gap-x-8 sm:grid-cols-2'>
				<CheckboxField className='italic'>
					<Checkbox
						disabled={isNA}
						color='brand'
						onChange={e => {
							handleSeperateUOMChange({
								field: fieldKey,
								newStatus: e,
								data,
								handlePrisma,
							})
						}}
					/>
					<Label className='text-interactive'>Use Separate UOM</Label>
				</CheckboxField>
				<CheckboxField className='italic'>
					<Checkbox
						color='brand'
						onChange={e => {
							const newData = { ...data }
							if (e) {
								newData.query[fieldKey] = { min: 0, max: 0, na: true, note: '' }
							} else {
								newData.query[fieldKey].na = false
							}

							handlePrisma(newData)
						}}
					/>
					<Label className='text-interactive'>Information Not Available</Label>
				</CheckboxField>
				<DurationInputField
					disabled={isNA}
					required
					label='Min'
					field={fieldKey}
					keyMinMax='min'
					data={data}
					handlePrisma={handlePrisma}
					className={cn('md:in-data-uom:col-1 md:in-data-uom:row-1')}
				/>
				<DurationSelectField
					disabled={isNA}
					seperateMinMax={separate}
					sizeKey='min'
					field={fieldKey}
					data={data}
					required
					handlePrisma={handlePrisma}
					className={cn('in-data-uom:col-2 in-data-uom:row-1')}
				/>
				<DurationInputField
					label='Max'
					required={separate}
					disabled={isNA}
					field={fieldKey}
					keyMinMax='max'
					data={data}
					handlePrisma={handlePrisma}
					className={cn('in-data-uom:col-1 in-data-uom:row-2')}
				/>
				<DurationSelectField
					disabled={!separate || data.query[fieldKey].na}
					seperateMinMax={separate}
					required={separate}
					sizeKey='max'
					field={fieldKey}
					data={data}
					handlePrisma={handlePrisma}
					className={cn('in-data-uom:col-2 in-data-uom:row-2')}
				/>
				{data.errors[fieldKey].base?.length > 0 && (
					<FormGroupError
						message={data.errors[fieldKey].base}
						className='col-span-full mt-0 text-center font-medium italic *:text-sm/12'
					/>
				)}
			</SubSectionFieldsetDetails>
		</SubSectionFieldset>
	)
}

const DurationInputField = ({
	keyMinMax,
	data,
	field,
	disabled = false,
	handlePrisma,
	...props
}: {
	field: Key
	keyMinMax: 'min' | 'max'
	disabled?: boolean
} & Props
	& Omit<FieldElProps, 'children'>
	& ElPrismaProps) => {
	const keyCasing = keyMinMax.charAt(0).toUpperCase() + keyMinMax.slice(1)

	const fieldCasing = field
		.replaceAll(/([A-Z])/g, ' $1')
		.split(' ')
		.map(c => c[0].toUpperCase() + c.slice(1))
		.join(' ')

	const { className, ...rest } = props

	return (
		<Field
			disabled={disabled}
			className={cn(className)}>
			<Label required={props.required}>{props.label}</Label>

			<InputGroup>
				<Icon
					IconName='CalendarAltIcon'
					data-slot='icon'
				/>
				<Input
					invalid={data.errors[field][keyMinMax]?.length > 0 ? true : undefined}
					{...rest}
					placeholder='0'
					name={`${field}${keyCasing}`}
					aria-label={`${fieldCasing} ${keyCasing}`}
					type='number'
					min={0}
					step={1}
					onBlur={e => {
						handlePrisma(
							handleTimeChange({
								data,
								queryField: field,
								durationType: keyMinMax,
								seperateUOM: data.durations[field].separate,
								value: e.target.value,
								change: 'time',
							})
						)
					}}
				/>
				<SuffixCounter
					data={data}
					field={field}
					minMax={keyMinMax}
				/>
			</InputGroup>
			<FormError
				message={data.errors[field][keyMinMax]}
				className='md:col-span-2'
			/>
		</Field>
	)
}

const SuffixCounter = ({
	data,
	field,
	minMax,
}: {
	data: Query
	field: Key
	minMax: 'min' | 'max'
}) => {
	const days = data.query[field]?.[minMax] ?? 1
	return (
		<span
			className='absolute top-1/2 right-3 -translate-y-1/2 text-xs italic opacity-50'
			data-slot='suffix'>
			{days} DAY{days > 1 && 'S'}
		</span>
	)
}

const DurationSelectField = ({
	seperateMinMax,
	sizeKey,
	handlePrisma,
	data,
	field,
	disabled = false,
	...props
}: Props
	& ElPrismaProps & {
		seperateMinMax: boolean
		sizeKey: 'min' | 'max'
		field: Key
		required?: boolean
		disabled?: boolean
	}) => {
	const upperKey =
		sizeKey == 'max' ?
			sizeKey.charAt(0).toUpperCase() + sizeKey.slice(1) + ' '
		:	seperateMinMax && sizeKey.charAt(0).toUpperCase() + sizeKey.slice(1) + ' '
	const upperField = seperateMinMax ? (toTitleCase(field) as string).split(' ').join(' ') : field

	return (
		<Field
			disabled={disabled}
			className={cn(props.className)}>
			<Label required={props.required && props.required == true}>{upperKey}UOM</Label>
			<Select
				name={`${upperField}UOM`}
				aria-label={`${toTitleCase(field)} ${upperKey}UOM`}
				className='text-muted-foreground'
				onChange={e => {
					handlePrisma(
						handleTimeChange({
							data,
							queryField: field,
							durationType: sizeKey,
							seperateUOM: seperateMinMax,
							value: e.currentTarget.value,
							change: 'unit',
						})
					)
				}}>
				{timeOptionEls.map(option => (
					<option
						key={option.base}
						value={option.value}>
						{option.label}
					</option>
				))}
			</Select>
		</Field>
	)
}
