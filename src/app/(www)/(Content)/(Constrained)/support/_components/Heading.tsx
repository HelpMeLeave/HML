'use client'

import { PageEyebrow, PageHeading, PageHGroup, PageSubtitle } from '~/components/Structure/Page'
import { Bold } from '~/components/Text/Bold'

export const SupportHeading = () => {
	return (
		<PageHGroup>
			<PageEyebrow>Support Team</PageEyebrow>
			<PageHeading>We're here to help</PageHeading>
			<PageSubtitle>
				Our goal is to make sure you feel supported in creating the evacuation plan that works best
				for you.
				<Bold className='block'>You are not alone</Bold>
			</PageSubtitle>
		</PageHGroup>
	)
}
