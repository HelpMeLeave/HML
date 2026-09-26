'use client'

import { Subsection, SubsectionHeading, SubsectionList } from '~/components/Structure/Subsection'
import { InlineLink } from '~/components/Text/Link'

export const ChoosingDestination = () => (
	<Subsection>
		<SubsectionHeading>Choosing your destination</SubsectionHeading>
		<SubsectionList>
			<InlineLink href='/claiming-asylum'>
				Claiming Asylum: What it Means and Where to Start
			</InlineLink>
			<InlineLink href='/explorer'>Visa Explorer</InlineLink>
		</SubsectionList>
	</Subsection>
)
