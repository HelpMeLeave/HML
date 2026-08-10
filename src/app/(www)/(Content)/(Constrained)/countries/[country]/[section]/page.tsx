import fs from 'fs'
import type { Metadata } from 'next'
import path from 'path'

import { CTA } from '~/components/CTA'
import { Divider } from '~/components/Divider'
import {
	Section,
	SectionEyebrow,
	SectionHeading,
	SectionHGroup,
	SectionSubtitle,
} from '~/components/Structure/Section'
import { InlineLink } from '~/components/Text/Link'
import { MDXProcessor } from '~/lib/mdx/ProcessMDX'
import { toTitleCase } from '~/lib/text'
import countriesMeta from '~/server/db/countries.json'
import db from '~/server/db/db'
import countries from '~/server/db/pathways.json'
import { Base } from '../Base'
import { Pathways } from '../_components/Pathways'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 86400
export const fetchCache = 'force-cache'

const sectionArr = ['basics', 'pathways', 'economy', 'social', 'employment', 'housing', 'medical']

export const generateMetadata = async ({
	params,
}: PageProps<'/countries/[country]/[section]'>): Promise<Metadata> => {
	const data = await params
	const country = toTitleCase(
		countriesMeta
			.find(c => c.abbr.toLowerCase() === data.country.toLowerCase())
			?.name?.replace('-', '')
	)

	const section = toTitleCase(data.section.replace('-', ' '))

	return {
		title: `${country}'s ${section}`,
		description: `Narrowed overview of ${country}'s ${section} information to ensure you're making an informed decision about your new home.`,
	}
}

export const generateStaticParams = async () => {
	const pathwayCountries = [
		...new Set(
			countries
				.filter(ea => ea.abbr)
				.map(ea => {
					return {
						country: ea.abbr.toUpperCase(),
					}
				})
		),
	]

	const countrySections = pathwayCountries.flatMap(country => {
		return sectionArr.map(section => ({
			country: country.country,
			section,
		}))
	})
	return countrySections
}

const CheckForSectionMDX = (country: string, section: string) => {
	const file = path.join('src', 'data', 'country', country, `${section}.mdx`)
	try {
		if (fs.existsSync(path.join(process.cwd(), file))) {
			return new MDXProcessor(file, 'path')
		} else {
			return null
		}
	} catch (e) {
		console.error(`Error checking for section file: ${e}`)
		return null
	}
}

const SectionPage = async ({
	params,
}: {
	params: Promise<{
		country: string
		section: string
	}>
}) => {
	const { country, section } = await params

	const pathway = db().getCountryByAbbr(country)

	const content =
		section == 'pathways' ?
			{
				Provider: () => (
					<Pathways
						pathways={pathway?.pathways || []}
						name={pathway?.name || ''}
					/>
				),
			}
		:	CheckForSectionMDX(country, section)

	return (
		<Base
			section={section}
			countryName={country}>
			{content ?
				<content.Provider />
			:	<>
					<Section>
						<SectionHGroup>
							<SectionEyebrow>No content found</SectionEyebrow>
							<SectionHeading>This country doesn't have any content yet.</SectionHeading>
							<SectionSubtitle>
								I'm sure someone will add some soon! Please keep checking back, or{' '}
								<InlineLink href='/guides-resources'>read our guides</InlineLink> in the meantime.
							</SectionSubtitle>
						</SectionHGroup>
					</Section>

					<Divider />
					<CTA
						subtitle='If you are at-risk and need help finding a safe pathway, please reach out to our support team.'
						primaryAction={{
							href: '/support',
							label: 'Get in touch',
						}}
						secondaryAction={{
							href: '/guides-resources',
							label: 'Read our guides',
						}}>
						Need help now?
					</CTA>
				</>
			}
		</Base>
	)
}

export default SectionPage
