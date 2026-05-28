import { type Metadata } from 'next'
import { CTA } from '~/components/CTA'
import { Page } from '~/components/Structure/Page'
import { Section } from '~/components/Structure/Section'
import { InlineLink } from '~/components/Text/Link'
import { Li, OL } from '~/components/Text/List'
import { Text } from '~/components/Text/Text'
// import db from '~/server/prisma/db'
import { FAQ } from './_components/faq'
import { SupportHeading } from './_components/Heading'
import { OnHold } from './_components/OnHold'
import { TriageModal } from './_components/TriageModal'

export const metadata: Metadata = {
	title: 'Support Team',
	description:
		'Our Support Team is here to help you create an evacuation plan that works best for you.',
}

export default async function SupportTeam() {
	// const supportForm = await db.settings.findUnique({
	// 	where: {
	// 		key: 'contact-form',
	// 	},
	// })

	// const isOn = supportForm?.value === 'on'
	// Quick github change on the fly
	// FIX ME LATER
	const isOn = true

	return (
		<Page>
			<SupportHeading />
			<Text>
				We’ll help you identify your most important support needs, explore which pathways may suit
				you best, and then walk with you through the steps of organizing, arranging, and planning
				along that pathway.
			</Text>
			<Text>
				Many members of the Support Team have also had to leave their home country. Whenever
				possible, you’ll speak with someone who has chosen and experienced a pathway similar to your
				own. We know that leaving behind a life—people, places, and things—is never easy. If you are
				truly ready to leave, or if you feel you cannot stay, we are here to make the logistics and
				mechanics as clear and manageable as possible.
			</Text>

			<FAQ />

			<Section>
				<Section.HGroup>
					<Section.Eyebrow>Help Us Help You</Section.Eyebrow>
					<Section.Heading>Before Reaching Out</Section.Heading>
					<Section.Subtitle>
						Reaching out can be scary, but asking for help is always the right choice—the best
						choice for you.
					</Section.Subtitle>
				</Section.HGroup>
				<Text>
					To make sure we can help you as best as possible, please read the following information
					before contacting us. These documents will help you understand the process and prepare for
					your conversation with our Support Team.
				</Text>

				{/* ! TODO: CHANGE THIS */}
				<OL className='text-balance *:mt-4'>
					<Li className='not-list-label'>
						<InlineLink href='/get-ready-to-leave'>Get Ready to Leave</InlineLink>
						<ul>
							<li>
								This document is where we recommend you start. It outlines essential steps from
								planning to packing, helping you create a personalized evacuation plan.
							</li>
						</ul>
					</Li>
					<Li>
						<InlineLink href='/claiming-asylum'>
							Claiming Asylum: What it Means and Where to Start
						</InlineLink>
						<ul>
							<li>
								Important for those considering asylum as a pathway, this guide provides important
								information about what asylum actually means, and if it is the right pathway for
								you.
							</li>
						</ul>
					</Li>
					<Li>
						<InlineLink href='#faq'>Frequently Asked Questions</InlineLink>
						<ul>
							<li>
								To keep our support team free to process users that are in dire need of relocation,
								we have compiled a list of frequently asked questions to help you find the
								information you need quickly.
							</li>
						</ul>
					</Li>
				</OL>
			</Section>

			{isOn ?
				<CTA
					primaryAction={<TriageModal />}
					secondaryAction={{
						href: '/get-ready-to-leave',
						label: 'Get Ready to Leave',
					}}>
					If you're ready,
					<br />
					we're ready.
				</CTA>
			:	<OnHold
					reason='We are working hard to expand our team and resources to
                            better serve you. Please check back in the coming days for
                            updates on when we will be able to accept new requests.'
				/>
			}
		</Page>
	)
}
