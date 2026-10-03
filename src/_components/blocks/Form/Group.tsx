import { Wrapper } from '@/_components/blocks/Form/_FormComponent/Wrapper'
import { renderField } from '@/_components/blocks/Form/renderField'
import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import type { FormFieldGroup } from '@/payload-types'

export const GroupFieldComponent = (props: FormFieldGroup) => {
  return (
    <Wrapper title={props.label ?? ''}>
      {props.message && (
        <RichTextComponent
          blockType='rich-text'
          content={props.message}
        />
      )}
      {props.fields?.map(renderField)}
    </Wrapper>
  )
}
