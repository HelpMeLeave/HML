import {
	Section,
	SectionEyebrow,
	SectionHeading,
	SectionHGroup,
	SectionSubtitle,
} from '~/components/Structure/Section'
import { InlineLink } from '~/components/Text/Link'
import { Li, UL } from '~/components/Text/List'

export const Pathways = ({ pathways, name }: { pathways: ApiData.Pathway[]; name: string }) => {
	return (
		<Section>
			<SectionHGroup>
				<SectionEyebrow>Pathways</SectionEyebrow>
				<SectionHeading>Pathways to {name}</SectionHeading>
				<SectionSubtitle>
					Most official information is from government websites, but some pathways are from
					community organizations or other sources.
				</SectionSubtitle>
			</SectionHGroup>

			<UL>
				{pathways.map(p => (
					<Li key={p.id}>
						{p.official_link && typeof p.official_link == 'string' ?
							<InlineLink
								href={p.official_link}
								target='_blank'
								rel='noopener noreferrer'>
								{p.name}
							</InlineLink>
						:	<span className='font-semibold text-red-500'>{p.name}</span>}
						{p.description && (
							<>
								<br />
								<span className='block pl-6'>{p.description}</span>
							</>
						)}
					</Li>
				))}
			</UL>
		</Section>
	)
}
