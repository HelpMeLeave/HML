import fs from 'fs'
import { type Metadata } from 'next'
import { getFrontmatter } from 'next-mdx-remote-client/utils'
import { Suspense } from 'react'
import { AlertCallout } from '~/components/AlertCallout'
import { Icon } from '~/components/Icon'
import { Page as PageEl, PageHeading } from '~/components/Structure/Page'
import { SectionHeading } from '~/components/Structure/Section'
import { InlineLink } from '~/components/Text/Link'
import { MDXProvider } from '~/lib/mdx/MDXProvider'
import { MDXProcessor } from '~/lib/mdx/ProcessMDX'
import { toTitleCase } from '~/lib/text'

export const generateStaticParams = () => {
	const pages = fs.readdirSync('src/data/pages')
	return pages.map(page => {
		const slug = page.replace('.mdx', '')
		return { slug }
	})
}

export const dynamicParams = false

export const generateMetadata = async ({ params }: PageProps<'/[slug]'>): Promise<Metadata> => {
	const { slug } = await params
	try {
		const file = fs.readFileSync(`src/data/pages/${slug}.mdx`, 'utf-8')
		if (file) {
			const data = getFrontmatter(file)
			const { metadata } = data.frontmatter as {
				metadata: {
					title?: string
					description?: string
				}
			}
			return {
				title: metadata.title ?? (toTitleCase(slug.replace(/-/g, ' ')) as string),
				description: metadata.description ?? undefined,
			}
		}
	} catch (e: AnySafe) {
		// File not found or other error
		console.error(e)
	}
	return { title: toTitleCase(slug.replace(/-/g, ' ')) as string }
}

const Page = async (props: PageProps<'/[slug]'>) => {
	const { slug } = await props.params
	const data = new MDXProcessor(`src/data/pages/${slug}.mdx`, 'path')
		.removeTitle()
		.replaceSubheadings()
		.replaceSubSections()
		.replaceCustomMDX()
		.setComponents({
			h2: props => <SectionHeading {...props} />,
		})

	const { subtitle, type, title, description, warnings } = data.frontmatter as {
		subtitle?: string
		type?: string
		title?: string
		description?: string
		warnings?: string[]
	}

	const parsedSlug = toTitleCase(slug.replace(/-/g, ' '))
	const ProcessSubtitle = () => {
		if (warnings && warnings.length > 0) {
			return (
				<MDXProvider
					source={warnings.join('\n\n')}
					components={{
						...data.components,
						p: AlertCallout,
						a: InlineLink,
					}}
				/>
			)
		} else if (subtitle) {
			return <span>{subtitle}</span>
		}
		return null
	}
	console.log(ProcessSubtitle())

	return (
		<PageEl>
			<Suspense fallback={<div>Loading...</div>}>
				<PageHeading
					subtitle={ProcessSubtitle()}
					eyebrow={
						<span className='flex items-center gap-1'>
							{toTitleCase(type as string)}s <Icon IconName='ArrowRightIcon' /> {description}
						</span>
					}>
					{title ?? parsedSlug}
				</PageHeading>
				<data.Provider />
			</Suspense>
		</PageEl>
	)
}

export default Page
