import {
	AddButton,
	CheckBox,
	RemoveButton,
	RemoveButtonWrapper,
	SubSectionFieldset,
	SubSectionFieldsetDetails,
	SubSectionFieldsetLegend,
} from '@/admin/_components'
import { Field, Textarea } from '@/admin/_components/catalyst'
import { note } from '@/admin/pathways/_lib/refresh'
import type { ElPrismaProps } from '@/admin/pathways/_lib/types'

export const Limitations = ({ data, handlePrisma }: ElPrismaProps) => {
	return (
		<>
			<CheckBox
				onClick={() => {
					handlePrisma(note(data, 'limitations', 'add'))
				}}
				label='Has Other Limitations'
				description={<>This pathway has other limitations outside of the pathway type</>}
			/>

			{data.query.limitations?.length > 0 && (
				<SubSectionFieldset className='md:pl-8'>
					<SubSectionFieldsetLegend description='Please include each limitation as a separate entry'>
						Limitations
					</SubSectionFieldsetLegend>
					<SubSectionFieldsetDetails>
						{data.query.limitations.map(n => (
							<div
								key={n.counter}
								className='grid grid-cols-[auto_.15fr] *:items-baseline *:last:grid-cols-1'>
								<Field className='col-start-1 mb-1'>
									<Textarea
										name={`limitationDetails${n.counter}`}
										className='mt-1'
										onBlur={e => {
											handlePrisma(
												note(
													data,
													'limitations',
													'update',
													{
														...n,
														note: e.target.value,
													},
													n.counter
												)
											)
										}}
									/>
								</Field>
								<RemoveButtonWrapper>
									<RemoveButton
										onClick={() => handlePrisma(note(data, 'limitations', 'remove', n, n.counter))}
									/>
								</RemoveButtonWrapper>
							</div>
						))}
						<AddButton
							onClick={() => {
								handlePrisma(note(data, 'limitations', 'add'))
							}}>
							Limitation
						</AddButton>
					</SubSectionFieldsetDetails>
				</SubSectionFieldset>
			)}
		</>
	)
}
