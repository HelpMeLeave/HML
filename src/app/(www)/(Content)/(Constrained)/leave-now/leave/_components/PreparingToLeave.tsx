'use client'

import { Subsection, SubsectionHeading, SubsectionList } from '~/components/Structure/Subsection'
import { InlineLink } from '~/components/Text/Link'

export const PreparingToLeave = () => (
	<Subsection>
		<SubsectionHeading>Preparing to leave</SubsectionHeading>
		<SubsectionList>
			<InlineLink
				href='/pdf/How-To-Book-a-Flight.pdf'
				target='_blank'>
				Booking a flight
			</InlineLink>
			<InlineLink
				href='/pdf/Moving-Checklist.pdf'
				target='_blank'>
				Moving checklist
			</InlineLink>
			<InlineLink
				href='/pdf/First-Month-Checklist.pdf'
				target='_blank'>
				Your first month
			</InlineLink>
		</SubsectionList>
	</Subsection>
)
