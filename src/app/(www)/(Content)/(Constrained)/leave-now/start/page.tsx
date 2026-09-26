import { type Metadata } from 'next'
import {
	Section,
	SectionEyebrow,
	SectionHeading,
	SectionHGroup,
	SectionSubtitle,
} from '~/components/Structure/Section'
import { Subsection, SubsectionHeading, SubsectionList } from '~/components/Structure/Subsection'
import { Text } from '~/components/Text/Text'

export const metadata: Metadata = {
	title: 'How to Start',
	description:
		'Getting started is a whirlwind, but we can help you understand your options and make a plan. We have guides and support staff ready to assist you.',
}

const StartPage = () => {
	return (
		<Section>
			<SectionHGroup>
				<SectionEyebrow>How to Start</SectionEyebrow>
				<SectionHeading>Visa vs. Asylum</SectionHeading>
				<SectionSubtitle>Each has its own requirements, benefits, and risks.</SectionSubtitle>
			</SectionHGroup>
			<Text>
				As a general rule, visas are better if you can meet the requirements, but they can take a
				long time to obtain. Asylum is usually faster, but it can be more complicated and risky.
			</Text>

			<Subsection>
				<SubsectionHeading>Work or Study Visa</SubsectionHeading>
				<SubsectionList
					children={[
						'Often requires a sponsor (employer, university, or family) or significant funds.',
						'Strict eligibility: financial proof, documents, background checks.',
						'Can take months or years to be approved.',
						'If approved, a residence permit is issued for a set period of time.',
						'If denied, you are still free to explore other visa options.',
					]}
				/>
			</Subsection>
			<Subsection>
				<SubsectionHeading>Tourist Visa</SubsectionHeading>
				<SubsectionList
					children={[
						'There are lots of places where American citizens can get lengthy tourist visas either immediately or very quickly.',
						'Many work or study visas have to be applied for FROM your home country.',
						'May also affect your ability to apply for asylum in your target country.',
					]}
				/>
			</Subsection>

			<Subsection>
				<SubsectionHeading>Asylum</SubsectionHeading>
				<SubsectionList
					children={[
						'Only for people with a well-founded fear of persecution (e.g. political opinion, religion, race, sexuality, social group).',
						'Must usually apply on arrival in the country of refuge.',
						'Free to apply; temporary housing, food, and medical support are often provided during the process.',
						'If denied, possible entry bans or forced return will be implemented by the local goverment.',
					]}
				/>
			</Subsection>
		</Section>
	)
}

export default StartPage
