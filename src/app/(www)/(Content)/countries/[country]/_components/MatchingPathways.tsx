import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import { Heading } from '@/components/primitives'
import { Section } from '@/components/Structure/Section'
import type { Country } from '@/payload-types'
import { getPayload } from '@/server/getPayload'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export const MatchingPathways = async ({ country }: { country: Pick<Country, 'id'> }) => {
  const payload = await getPayload()
  const { docs: pathways } = await payload.find({
    collection: 'v1Pathways',
    where: {
      country: { equals: country.id.toUpperCase() },
    },
    sort: ['title'],
    limit: 0,
  })

  return (
    <Section heading='Pathways'>
      {pathways.length > 0
        && pathways.map((pathway) => (
          <section
            key={pathway.id}
            className='my-8'>
            <Heading
              level={3}
              className='mb-0 text-start leading-[0.85]'>
              {pathway.title}
            </Heading>
            <RichTextComponent
              blockType='rich-text'
              content={pathway.description as DefaultTypedEditorState}
            />
          </section>
        ))}
    </Section>
  )
}
