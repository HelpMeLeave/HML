import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import type { Form } from '@/payload-types'

export const IntroMessage = ({ content }: { content: Form['introMessage'] }) =>
  content && (
    <RichTextComponent
      blockType='rich-text'
      content={content}
    />
  )
