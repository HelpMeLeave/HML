import type { Metadata } from 'next'

import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import { removeParagraph } from '@/_components/lexicals/RenderRichText/removeParagraphs'
import { getDonationResult } from '@/app/(api)/stripe/donate'
import { InlineLink } from '@/components/primitives/Link'
import type { MainDetails } from '@/components/Structure/_types'
import { MainEyebrow, MainHeading, MainHGroup, MainSubtitle } from '@/components/Structure/Main'
import { Section, SectionHeading, SectionHGroup } from '@/components/Structure/Section'
import type { Content } from '@/payload-types'
import { getPayload } from '@/server/getPayload'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { PaginatedDocs } from 'payload'
import { baseQry } from 'www/(Content)/[...slug]/_lib/baseQry'
import { DonationPageClient } from 'www/(Content)/donate/page.client'
import { NotFound } from 'www/_components/NotFound'
import './style.css'

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support Help Me Leave. Your gift helps vulnerable people seek safety and build new lives.',
}

type PublishedContent = {
  adminTitle: string
  type: string
  doc: Pick<Content, 'contentType' | 'id'> & {
    currentLifecycle: {
      published: {
        id: number
        snapshot: {
          content: DefaultTypedEditorState
          'other-brow'?: DefaultTypedEditorState
          subtitle: DefaultTypedEditorState
          title: string
        }
      }
    }
  }
}

const DonationsPage = async ({ searchParams }: PageProps<'/donate'>) => {
  const params = await searchParams
  const preview = Object.keys(params).includes('preview')

  const returned = typeof params.result == 'string' ? params.result : null
  const initialResult = returned ? await getDonationResult(returned) : null

  const payload = await getPayload()
  const { docs } = (await payload.find(
    baseQry('donate', preview == true)
  )) as PaginatedDocs<PublishedContent>

  const parsePublished = (data: PublishedContent) => data.doc.currentLifecycle.published.snapshot

  if (docs.length < 1) {
    return <NotFound />
  }

  const doc = preview ? (docs[0].doc as Content) : parsePublished(docs[0])

  return (
    <>
      <DonationPageClient initialResult={initialResult}>
        <MainHGroup>
          <MainEyebrow
            pageDetails={
              preview ?
                (doc as MainDetails)
              : {
                  type: docs[0].type,
                  contentType: docs[0].doc.contentType,
                  'other-brow': docs[0].doc.currentLifecycle.published.snapshot['other-brow'],
                }
            }
          />
          <MainHeading>{doc.title}</MainHeading>
          {doc.subtitle && (
            <MainSubtitle>
              <RichTextComponent
                blockType='rich-text'
                converterOverrides={{ paragraph: removeParagraph }}
                content={doc.subtitle}
              />
            </MainSubtitle>
          )}
        </MainHGroup>
        <Section>
          <SectionHGroup>
            <SectionHeading>Have Questions?</SectionHeading>
          </SectionHGroup>
          E-Mail Us at{' '}
          <InlineLink
            className='decoration-accent/50'
            href='mailto:donations@helpmeleave.us'>
            Donations@helpmeleave.us
          </InlineLink>
        </Section>
        <Section>
          <SectionHGroup>
            <SectionHeading>Direct Bank Transfer?</SectionHeading>
          </SectionHGroup>
          <dl className='no-typography mx-6 grid max-w-max grid-cols-[auto_1fr] gap-x-4 *:text-sm *:odd:text-end *:odd:font-semibold'>
            <dt className='strong'>Account Name:</dt> <dd>Help Me Leave Stichting</dd>
            <dt className='strong'>IBAN:</dt> <dd>FR76 2763 3121 2904 9186 5658 583</dd>
            <dt className='strong'>BIC Code:</dt> <dd>BUNQFRP2</dd>
          </dl>
        </Section>
      </DonationPageClient>
    </>
  )
}

export default DonationsPage
