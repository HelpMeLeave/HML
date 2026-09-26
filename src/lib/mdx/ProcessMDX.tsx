import { type MDXRemoteProps } from 'next-mdx-remote-client/rsc'
import { Suspense } from 'react'
import { Loading } from '~/components/Loading'
import { mdxComponents } from '~/components/MDX'
import { MDXProvider } from '~/lib/mdx/MDXProvider'
import { getPrelimSource, getSourceRaw } from '~/lib/mdx/getSourceRaw'
import { recmaPlugins, rehypePlugins, remarkPlugins } from '~/lib/mdx/plugins'

interface iMDXProcessor {
	sourceType: 'path' | 'raw'
	raw: string
	title: string
	frontmatter: Record<string, unknown>
	components: MDXRemoteProps['components']
	plugins: Record<PluginKeys, unknown[]>
	removeTitle: () => this
	setComponents: (components: MDXRemoteProps['components']) => this
	processTags: () => void
}

export class MDXProcessor {
	public sourceType
	public raw
	title: iMDXProcessor['title'] = ''
	frontmatter: iMDXProcessor['frontmatter'] = {}
	components: MDXRemoteProps['components'] = mdxComponents()
	plugins: iMDXProcessor['plugins'] = {} as iMDXProcessor['plugins']
	sources: { title: string; source: string }[] = []

	constructor(
		public source: MDXRemoteProps['source'],
		type?: 'path' | 'raw'
	) {
		this.sourceType = type ?? setType(source)
		this.raw = setRaw(this, source as string).replace(/\n\n\n/g, '\n\n')
	}

	removeTitle = (): this => {
		const titleRegex = /^(#\s+)(.*)$/m // Matches the first line starting with a single '#'

		const title = this.raw.match(titleRegex)?.[2] || ''
		this.title = (this.frontmatter.title as string) || title.trim()

		this.raw = this.raw.replace(titleRegex, '').replace(/^\n+/, '')

		return this
	}

	setComponents = (components?: MDXRemoteProps['components']): this => {
		if (!components) return this
		this.components = {
			...this.components,
			...components,
		}
		return this
	}

	addPlugin = (
		plugins?: MDXProcessor['plugins'],
		pluginType?: 'recmaPlugins' | 'remarkPlugins' | 'rehypePlugins'
	) => {
		this.plugins = setPlugins(this, plugins, pluginType)
		return this
	}

	processTags = (): void => {
		if (this.frontmatter.tags) {
			this.frontmatter.tags =
				Array.isArray(this.frontmatter.tags) ? this.frontmatter.tags
				: typeof this.frontmatter.tags == 'string' ?
					this.frontmatter.tags.split(',').map(tag => tag.trim())
				:	this.frontmatter.tags
			const newBaseTags = [] as Array<string | Record<string, string>>
			;(this.frontmatter.tags as string[]).forEach(tag => {
				if (tag.includes('/')) {
					const [base, ...rest] = tag.split('/')
					!newBaseTags.includes(base) && newBaseTags.push(base.trim())
					newBaseTags.push({
						[base]: rest.join('/').trim(),
					})
				} else {
					newBaseTags.push(tag)
				}
			})
			this.frontmatter.tags = newBaseTags
		}
	}

	replaceSubheadings = (): this => {
		this.raw = MDXSectionHeading({ source: this.raw })

		return this
	}

	replaceSubSections = (): this => {
		this.raw = MDXSubSection({ source: this.raw })

		return this
	}

	replaceCustomMDX = (): this => {
		this.raw = this.raw.replaceAll(/^->(.+)$/gm, '<P className="text-center">$1</P>')

		this.sources =
			([...(this.raw.match(/\s?(\[\^[^)]+\))/g) ?? [])]
				.map((ea, i) => {
					const matches = ea.match(/\s?\[\^(.+)\]\((.+)\)/) ?? []
					if (matches && Array.isArray(matches)) {
						if (matches[0]) {
							this.raw = this.raw.replace(
								matches[0],
								`<InlineLink className="sup no-underline mx-px italic text-hml-red dark:text-hml-yellow-400" href="#${matches[1]}"><sup>[${i}]</sup></InlineLink>`
							)
						}

						return {
							title: matches[1],
							source: matches[2],
						}
					}
				})
				.filter(Boolean) as MDXProcessor['sources']) ?? []

		return this
	}

	replaceCTA = () => {
		const splitSource = this.raw.split('\n')
		for (let i = 0; i < splitSource.length; i++) {
			if (splitSource[i].startsWith('```CTA')) {
				const consumedLines = []
				const CTA = {
					title: '',
					subtitle: '',
					action1: { label: '', link: '' },
					action2: { label: '', link: '' },
				}
				while (i < splitSource.length) {
					consumedLines.push(splitSource[i])

					if (splitSource[i].endsWith('```')) {
						i++
						break
					}
					if (splitSource[i].toLowerCase().includes('title:'))
						CTA.title = splitSource[i].split(':')[1].trim()
					if (splitSource[i].toLowerCase().includes('subtitle:'))
						CTA.subtitle = splitSource[i].split(':')[1].trim()
					if (splitSource[i].toLowerCase().includes('button 1:')) {
						const matches = splitSource[i].match(/button 1:\s*\[(.*?)\]\((.*?)\)/i)
						if (matches && matches.length === 3) {
							CTA.action1.label = matches[1].trim()
							CTA.action1.link = matches[2].trim()
						}
					}
					if (splitSource[i].toLowerCase().includes('button 2:')) {
						const matches = splitSource[i].match(/button 2:\s*\[(.*?)\]\((.*?)\)/i)
						if (matches && matches.length === 3) {
							CTA.action2.label = matches[1].trim()
							CTA.action2.link = matches[2].trim()
						}
					}
					i++
				}
				splitSource[i - consumedLines.length] =
					`<CTA title={"${CTA.title}"} subtitle={"${CTA.subtitle}"} primaryAction={{ label: "${CTA.action1.label}", href: "${CTA.action1.link}" }} secondaryAction={{ label: "${CTA.action2.label}", href: "${CTA.action2.link}" }} />`
				for (let j = 1; j < consumedLines.length; j++) {
					splitSource[i - consumedLines.length + j] = ''
				}
			}
		}
		this.raw = splitSource.join('\n')

		return this
	}

	Provider = ({
		...props
	}: Omit<MDXRemoteProps, 'source'> & {
		components?: MDXRemoteProps['components']
		plugins?: Record<PluginKeys, unknown[]>
	}) => {
		this.setComponents(props.components)
		this.addPlugin(props.plugins)

		return (
			<Suspense fallback={<Loading />}>
				<MDXProvider
					source={this.raw}
					options={{
						parseFrontmatter: true,
						vfileDataIntoScope: true,
						mdxOptions: {
							...(this.plugins as Record<string, unknown>),
						},
					}}
					components={this.components}
				/>
			</Suspense>
		)
	}
}

const setRaw = (processor: MDXProcessor, source: string): string => {
	const { frontmatter, raw } = getSourceRaw(processor.sourceType, source)

	processor.frontmatter = frontmatter as Record<string, string | string[]>
	processor.processTags()
	processor.raw = raw

	if (processor.frontmatter.title) {
		processor.title = processor.frontmatter.title as string
	}
	return processor.raw
}

const setType = (source: MDXRemoteProps['source']): 'raw' | 'path' => {
	const prelimType = Array.isArray(source) || String(source).endsWith('mdx') ? 'path' : 'raw'

	if (prelimType == 'path') {
		return getPrelimSource(prelimType, source as string) as 'path'
	}
	return prelimType
}

const setPlugins = (
	processor: MDXProcessor,
	plugins?: MDXProcessor['plugins'],
	pluginKey?: PluginKeys
) => {
	if (Object.keys(processor.plugins).length <= 0) {
		processor.plugins = {
			remarkPlugins: remarkPlugins,
			rehypePlugins: rehypePlugins,
			recmaPlugins: recmaPlugins,
		} as MDXProcessor['plugins']
	}
	if (!plugins) return processor.plugins

	if (pluginKey) {
		processor.plugins[pluginKey].push(...(plugins?.[pluginKey] as unknown[]))
		return processor.plugins
	} else {
		const keys = Object.keys(plugins) as PluginKeys[]

		keys.forEach(key => {
			if (processor.plugins[key]) {
				processor.plugins[key]
					.filter(plug => plug != plugins[key])
					.push(...(plugins ? (plugins[key] as unknown[]) : []))
			} else {
				processor.plugins[key] = plugins[key] as unknown[]
			}
		})
	}

	return processor.plugins
}

const MDXSectionHeading = ({ source }: { source: string }) => {
	let testSource = source

	const sectionRegex = Array.from(testSource.matchAll(/(^> .+\n)?^## .+(\n> .+)?/gm))

	sectionRegex.forEach((match: string[], i) => {
		const finalLines = {
			heading: '',
			brow: '',
			subtitle: '',
			headingId: '',
		}

		const ifHeading = (entry: string) => {
			if (entry.startsWith('## ')) {
				finalLines.heading = entry.replaceAll('## ', '').trim()
				finalLines.headingId = finalLines.heading.replaceAll(' ', '-').toLowerCase()
			}
		}

		const ifEyebrow = (entry: string) => {
			if (entry.startsWith('> ')) {
				finalLines.brow = entry.replace('> ', '').trim()
			}
		}

		const ifSubtitle = (entry: string) => {
			if (entry.startsWith('> ')) {
				finalLines.subtitle = entry.replace('> ', '').trim()
			}
		}

		const splitLines = match[0].split('\n')

		if (splitLines.length == 3) {
			ifHeading(splitLines[1])
			ifEyebrow(splitLines[0])
			ifSubtitle(splitLines[2])
		} else if (splitLines.length == 2) {
			if (splitLines[0].startsWith('## ')) {
				ifHeading(splitLines[0])
				ifSubtitle(splitLines[1])
			} else if (splitLines[1].startsWith('## ')) {
				ifEyebrow(splitLines[0])
				ifHeading(splitLines[1])
			}
		} else {
			ifHeading(splitLines[0])
		}

		const final = Object.values(finalLines).filter(line => line)

		if (final.length == 0) return
		testSource = testSource.replace(
			match[0],
			`${i > 0 ? '</Section>\n' : ''}<Section>\n<SectionHeading id={"${finalLines.headingId}"} eyebrow={<>${replaceLinks(finalLines.brow)}</>} subtitle={<>${replaceLinks(finalLines.subtitle)}</>}>${finalLines.heading}</SectionHeading>\n`
		)
	})
	if (testSource.includes('<Section>')) testSource += '\n</Section>'
	return testSource
}

const MDXSubSection = ({ source }: { source: string }) => {
	const splitSource = source.split('\n')
	let removedLines = [] as number[]
	splitSource.forEach((line, i) => {
		if (line.startsWith('### ')) {
			removedLines.push(i)

			splitSource[i] = `${removedLines.length > 1 ? '</Subsection>\n' : ''}<Subsection id={"${line
				.replaceAll('### ', '')
				.replaceAll(' ', '-')
				.replaceAll('#', '')
				.toLowerCase()}"} title={"${line.replace('### ', '')}"}>`
		}
		if (line.startsWith('## ') || line.startsWith('</Section>')) {
			splitSource[i] = `${removedLines.length > 0 ? '</Subsection>\n' : ''}${line}`
			removedLines = []
		}
	})
	return splitSource.join('\n') + `${removedLines.length > 0 ? '</Subsection>' : ''}`
}

const replaceLinks = (text: string) => {
	const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
	return text.replace(linkRegex, '<InlineLink href="$2">$1</InlineLink>')
}

type PluginKeys = 'recmaPlugins' | 'remarkPlugins' | 'rehypePlugins'
