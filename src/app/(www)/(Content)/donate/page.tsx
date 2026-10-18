import type { Metadata } from 'next'

import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import { getDonationResult } from '@/app/(api)/stripe/donate'
import { query } from '@/app/(www)/(Content)/[...slug]/_lib/query'
import { InlineLink } from '@/components/primitives/Link'
import type { MainDetails } from '@/components/Structure/_types'
import { MainEyebrow, MainHeading, MainHGroup, MainSubtitle } from '@/components/Structure/Main'
import { Section } from '@/components/Structure/Section'
import { removeParagraph } from '@/lexicals/RenderRichText/removeParagraphs'
import type { Content, ContentRecord, Tag, User } from '@/payload-types'
import type { BasePayload } from 'payload'
import { DonationPageClient } from 'www/(Content)/donate/page.client'
import { NotFound } from 'www/_components/NotFound'
import './style.css'

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support Help Me Leave. Your gift helps vulnerable people seek safety and build new lives.',
}

const DonationsPage = async ({ searchParams }: PageProps<'/donate'>) => {
  const params = await searchParams
  const preview = Object.keys(params).includes('preview')

  const returned = typeof params.result == 'string' ? params.result : null
  const initialResult = returned ? await getDonationResult(returned) : null

  // const payload = await getPayload()
  const { doc } = (await query({ url: 'donate', preview })) as {
    user: User | false
    doc: Content
    payload: BasePayload
  }

  if (!doc) {
    return <NotFound />
  }

  return (
    doc && (
      <>
        <DonationPageClient initialResult={initialResult}>
          <MainHGroup>
            <MainEyebrow
              pageDetails={
                preview ?
                  (doc as MainDetails)
                : ({
                    type: doc.type as Tag,
                    contentType: doc.contentType as string,
                    'other-brow': (doc.currentLifecycle?.published as ContentRecord)?.snapshot?.[
                      'other-brow'
                    ],
                  } as MainDetails)
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
          <Section heading={'Have Questions?'}>
            E-Mail Us at{' '}
            <InlineLink
              className='decoration-accent/50'
              href='mailto:donations@helpmeleave.us'>
              Donations@helpmeleave.us
            </InlineLink>
          </Section>
          <Section heading='Direct Bank Transfer?'>
            <dl className='no-typography mx-6 grid max-w-max grid-cols-[auto_1fr] gap-x-4 *:text-sm *:odd:text-end *:odd:font-semibold'>
              <dt className='strong'>Account Name:</dt> <dd>Help Me Leave Stichting</dd>
              <dt className='strong'>IBAN:</dt> <dd>FR76 2763 3121 2904 9186 5658 583</dd>
              <dt className='strong'>BIC Code:</dt> <dd>BUNQFRP2</dd>
            </dl>
          </Section>
        </DonationPageClient>
      </>
    )
  )
}

export default DonationsPage
