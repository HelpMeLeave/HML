import {
	SubSectionFieldset,
	SubSectionFieldsetDetails,
	SubSectionFieldsetLegend,
} from '@/admin/_components'
import { Checkbox, CheckboxField, Label, Select } from '@/admin/_components/catalyst'
import type { ElPrismaProps } from '@/admin/pathways/_lib/types'
import { CostInput, CostRangeFieldsGroup, refresh } from '@/admin/pathways/add'
import type { Country, Currency } from '~/server/prisma/generated/browser'

export const ApplicationCost = ({
	data,
	handlePrisma,
	countries,
}: ElPrismaProps & {
	countries: Array<
		Country & {
			currencies: Currency[]
		}
	>
}) => {
	// #region ! ---------- FNS ----------
	const currencyOptions = countries
		.filter(c => c.code === data.query.countryCode)
		.flatMap(c => c.currencies)

	const currencyOptionEls = () => {
		const currencies: {
			value: string
			label: string
			base: string
		}[] = []

		for (const currency of currencyOptions) {
			currencies.push({
				value: currency.code,
				label: `${currency.code} - ${currency.symbol}`,
				base: currency.code,
			})
		}

		return currencies
	}
	// #endregion ! --------------------

	const currencies = currencyOptionEls()
	const disabled = data.query.cost.na

	return (
		<SubSectionFieldset>
			<SubSectionFieldsetLegend
				aria-label='Cost'
				description='The cost associated with applying for this pathway. Do not include costs for documents as those will be covered in the Documentation section.'>
				Cost
			</SubSectionFieldsetLegend>
			<SubSectionFieldsetDetails className='gap-x-8 sm:grid-cols-3'>
				<CostRangeFieldsGroup
					disabled={disabled}
					required
					label='Min'
					errorMessages={data.errors.cost.min}>
					<CostInput
						data={data}
						keyMinMax='min'
						handlePrisma={handlePrisma}
					/>
				</CostRangeFieldsGroup>
				<CostRangeFieldsGroup
					disabled={disabled}
					label='Max'
					errorMessages={data.errors.cost.max}>
					<CostInput
						data={data}
						keyMinMax='max'
						handlePrisma={handlePrisma}
					/>
				</CostRangeFieldsGroup>
				<CostRangeFieldsGroup
					disabled={currencies.length === 0 || disabled}
					required
					label='Currency'
					errorMessages={[]}>
					<Select
						name={`costUOM`}
						aria-label={`Cost UOM`}
						className='has-data-disabled:italic *:data-disabled:text-xs/loose'
						onChange={e => {
							const selectedCurrency = currencyOptions[e.target.selectedIndex]

							handlePrisma(refresh(data, 'currencyCode', selectedCurrency.code))
						}}>
						{currencies.length > 0 ?
							currencies.map(option => (
								<option
									key={option.base}
									value={option.value}>
									{option.label}
								</option>
							))
						:	<option
								key={''}
								value={''}>
								{'Select a Country'}
							</option>
						}
					</Select>
				</CostRangeFieldsGroup>
				<CheckboxField disabled={currencies.length === 0 || disabled}>
					<Checkbox
						color='brand'
						onChange={e => {
							const newCode = currencies.length == 1 ? currencies[0].base : ''
							const allCurrencies = data.utilities.countryData?.currencies as {
								symbol: string
								name: string
								code: string
							}[]
							handlePrisma({
								...data,
								query: {
									...data.query,
									currencyCode: e ? 'USD' : newCode,
								},
								utilities: {
									...data.utilities,
									countryData: {
										...data.utilities.countryData,
										currencies: [
											...allCurrencies,
											{
												symbol: '$',
												name: 'United States Dollar',
												code: 'USD',
											},
										],
									} as Country & {
										currencies: Currency[]
									},
								},
							})
						}}
					/>
					<Label className='text-interactive ml-2 whitespace-nowrap'>Use USD?</Label>
				</CheckboxField>
				<CheckboxField>
					<Checkbox
						color='brand'
						onChange={e => {
							const newData = { ...data }
							if (e) {
								newData.query.cost = { min: 0, max: 0, na: true }
							} else {
								newData.query.cost.na = false
							}

							handlePrisma(newData)
						}}
					/>
					<Label className='text-interactive ml-2 whitespace-nowrap'>
						Information Not Available
					</Label>
				</CheckboxField>
			</SubSectionFieldsetDetails>
		</SubSectionFieldset>
	)
}
