'use client'

import { useContext } from 'react'
import {
	Section,
	SectionEyebrow,
	SectionHeading,
	SectionHGroup,
	SectionSubtitle,
} from '~/components/Structure/Section'
import { Subsection, SubsectionContent, SubsectionHeading } from '~/components/Structure/Subsection'
import { useLocalData } from '~/hooks/useLocalData'
import { DBContext } from '~/server/db/provider'

export const MatchingPathways = ({ country }: { country: ApiData.Country['abbr'] }) => {
	const data = useContext(DBContext).countries.find(c => c.abbr.toLowerCase() == country)
	const explorerFilters = useLocalData<Array<keyof ApiData.Pathway>>('explorer-filters')

	const pathways = data?.pathways?.filter(p => {
		if (
			(explorerFilters ?? []).every(f => {
				if (['prideScore', 'transSafety'].includes(f)) {
					return true
				}
				if (f == 'job_required') {
					return p[f] == false
				}
				return p[f]
			})
		) {
			return true
		}
		return false
	})

	return pathways && pathways.length > 0 ?
			<Section>
				<SectionHGroup>
					<SectionEyebrow>Your Pathways</SectionEyebrow>
					<SectionHeading>Matching Pathways</SectionHeading>
					<SectionSubtitle>Here are the pathways that align with your needs</SectionSubtitle>
				</SectionHGroup>

				{pathways.map(pathway => (
					<Subsection key={pathway.id}>
						<SubsectionHeading className='text-start'>{pathway.name}</SubsectionHeading>
						<SubsectionContent>{pathway.description}</SubsectionContent>
					</Subsection>
				))}
			</Section>
		:	<></>
}
