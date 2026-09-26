'use client'

import {
	Section,
	SectionEyebrow,
	SectionHeading,
	SectionHGroup,
	SectionSubtitle,
} from '~/components/Structure/Section'
import { resources, ResourceSection } from '..'

export const GuidesContent = () => {
	return (
		<Section>
			<SectionHGroup>
				<SectionEyebrow>How-To Guides & Resources</SectionEyebrow>
				<SectionHeading>Hope this helps</SectionHeading>
				<SectionSubtitle>
					We know this process can be overwhelming. These guides and resources are designed to help
					you navigate the complexities of planning your evacuation, offering practical advice and
					insights to empower your journey.
				</SectionSubtitle>
			</SectionHGroup>
			{Object.keys(resources).map(r => (
				<ResourceSection
					key={r}
					sectionTitle={r}
					resourceArray={resources[r].links}
				/>
			))}
		</Section>
	)
}
