import { type Metadata } from 'next'
import {
	Section,
	SectionHeading,
	SectionHGroup,
	SectionSubtitle,
} from '~/components/Structure/Section'
import { ChoosingDestination } from './_components/ChoosingDestination'
import { LeaveNowDocuments } from './_components/Documents'
import { PreparingToLeave } from './_components/PreparingToLeave'

export const metadata: Metadata = {
	title: 'How to Leave',
	description:
		'The Help Me Leave team has compiled lists and resources to help you with each step of the process.',
}

const LeavePage = () => {
	return (
		<Section>
			<SectionHGroup>
				<SectionHeading>How to Leave</SectionHeading>
				<SectionSubtitle>
					No matter if you're currently getting your documents, choosing your destination, or
					actively making travel plans. Our team has compiled lists and resources to help you with
					each step of the process.
				</SectionSubtitle>
			</SectionHGroup>
			<LeaveNowDocuments />
			<ChoosingDestination />
			<PreparingToLeave />
		</Section>
	)
}

export default LeavePage
