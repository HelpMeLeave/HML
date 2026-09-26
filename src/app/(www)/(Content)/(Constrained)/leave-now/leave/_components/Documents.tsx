'use client'

import { Subsection, SubsectionHeading, SubsectionList } from '~/components/Structure/Subsection'
import { InlineLink } from '~/components/Text/Link'

export const LeaveNowDocuments = () => {
	return (
		<Subsection>
			<SubsectionHeading>Documents</SubsectionHeading>
			<SubsectionList>
				<InlineLink
					href='/pdf/Get-Your-Documents-Ready.pdf'
					target='_blank'>
					Get Your Documents Ready
				</InlineLink>
				<InlineLink
					href='/pdf/Passport-Checklist.pdf'
					target='_blank'>
					Apply for a passport
				</InlineLink>
				<InlineLink
					href='/pdf/REAL-ID-Checklist.pdf'
					target='_blank'>
					REAL ID
				</InlineLink>
				<InlineLink
					href='/pdf/Replace-Birth-Certificate-Checklist.pdf'
					target='_blank'>
					Birth certificate
				</InlineLink>
			</SubsectionList>
		</Subsection>
	)
}
