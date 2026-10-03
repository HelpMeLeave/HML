import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import { Fieldset } from '@/_components/views/Register/_components/Fieldset'
import type { VolunteerAgreement as VolunteerAgreementGlobal } from '@/payload-types'

export const VolunteerAgreement = async ({
  agreement,
}: {
  agreement: VolunteerAgreementGlobal['agreement']
}) => {
  return (
    <Fieldset label='Volunteer Agreement'>
      {agreement && (
        <RichTextComponent
          content={agreement}
          blockType={'rich-text'}
        />
      )}
    </Fieldset>
  )
}
