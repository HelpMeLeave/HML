import RichTextConverter from '@/_components/lexicals/RenderRichText'
import type { FormFieldMessage } from '@/payload-types'

export const MessageFieldComponent = (props: FormFieldMessage) => (
  <div className='flex-1 basis-auto'>
    <RichTextConverter data={props.content} />
  </div>
)
