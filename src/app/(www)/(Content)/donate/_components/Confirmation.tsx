import type { DonationResult } from '@/app/(api)/stripe/_types/SessionData'
import { Bold, Text } from '@/components/primitives'
import { InlineLink } from '@/components/primitives/Link'
import {
  Section,
  SectionHeading,
  SectionHGroup,
  SectionSubtitle,
} from '@/components/Structure/Section'

/** The stepper's final step, reached two ways: a card confirms in place and AmtFieldset dispatches the result, or a redirecting method sends the donor to their bank and back to /donate?result=, where page.tsx resolves it server-side and seeds the reducer. Both are the same getDonationResult shape. */
export const Confirmation = ({ result }: { result: DonationResult }) => {
  const { paid, pending, email, total, receiptUrl } = result

  const texts =
    paid ?
      {
        title: 'Thank You',
        subtitle: true,
        body: (
          <>
            A receipt is on its way
            {email ?
              <>
                {' '}
                to <Bold>{email}</Bold>
              </>
            : ''}
            .
          </>
        ),
      }
    : pending ?
      {
        title: 'Almost there',
        body: `We’ve got your donation of ${total} and it’s still settling. We’ll email you
					${email ? ` at ${email}` : ''} once it clears.`,
      }
    : {
        title: 'Your donation didn’t go through',
        body: 'Nothing was charged. You’re welcome to try again.',
      }

  return (
    <Section>
      <SectionHGroup>
        <SectionHeading
          data-paid={paid ? '' : undefined}
          className='data-paid:text-accent'>
          {texts.title}
        </SectionHeading>
        {texts.subtitle && (
          <SectionSubtitle>
            We are <em>eternally</em> grateful to anyone who chooses to support us! Your gift will
            help vulnerable people seek safety and build new lives.
          </SectionSubtitle>
        )}
      </SectionHGroup>

      <Text className='mt-2'>{texts.body}</Text>

      <div className='flex flex-wrap gap-3'>
        {receiptUrl && (
          <InlineLink
            className='text-lg'
            href={receiptUrl}
            target='_blank'
            rel='noopener noreferrer'>
            View your receipt
          </InlineLink>
        )}
      </div>
    </Section>
  )
}
