import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import type { Form } from '@/payload-types'

export const Confirmation = (
  props: Pick<Form, 'confirmationType' | 'confirmationMessage'> & {
    isPending: boolean
    hasSubmitted: boolean | undefined
  }
) => {
  if (props.confirmationMessage && props.confirmationType == 'message')
    return (
      props.hasSubmitted
      && !props.isPending && (
        <RichTextComponent
          blockType='rich-text'
          content={props.confirmationMessage}
        />
      )
    )
}
