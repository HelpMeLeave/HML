import fs from 'fs'
import path from 'path'
import { Section } from '~/components/Structure/Section'
import { Subsection, SubsectionContent, SubsectionHeading } from '~/components/Structure/Subsection'
import { MDXProcessor } from '~/lib/mdx/ProcessMDX'

export const FAQ = () => {
	const questions: Array<{
		q: string
		A: MDXProcessor
	}> = fs
		.readFileSync(path.join(process.cwd(), 'src/app/(www)/(Content)/(Constrained)/support/faq.mdx'))
		.toString()
		.split('### Q: ')
		.map(ea => {
			const [q, ...a] = ea.split('\n').filter(line => line.trim() !== '')
			return {
				q: q.trim(),
				A: new MDXProcessor(a.join('\n').trim()),
			}
		})
		.slice(1)

	return (
		<Section>
			<Section.HGroup>
				<Section.Eyebrow>FAQ</Section.Eyebrow>
				<Section.Heading>Only Have a Quick Question?</Section.Heading>
				<Section.Subtitle>
					To keep our support team free to process users that are in dire need of relocation, we
					have compiled a list of frequently asked questions to help you find the information you
					need quickly.
				</Section.Subtitle>
			</Section.HGroup>

			{questions.map(ea => (
				<Subsection
					defaultOpen={false}
					type='grey'
					key={ea.q}>
					<SubsectionHeading>
						<span className='flex items-start justify-start gap-4 text-start'>
							<span>Q:</span>
							{ea.q}
						</span>
					</SubsectionHeading>
					<SubsectionContent>
						<ea.A.Provider />
					</SubsectionContent>
				</Subsection>
			))}
		</Section>
	)
}
