import { cn } from '@/lib/cn'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as ConvertRichText, type JSXConverters } from '@payloadcms/richtext-lexical/react'
import { jsxConverters } from './jsxConverters'

export type RichTextProps = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  converterOverrides?: JSXConverters
  pageType?: string
  /** Wraps the output in a flow container (page bodies); off for inline uses like subtitles. */
  flow?: boolean
} & Props<'div'>

const RichTextConverter = ({ className, flow, ...props }: RichTextProps) => {
  const content = (
    <ConvertRichText
      converters={jsxConverters(props.converterOverrides)}
      disableContainer
      disableTextAlign
      className={className}
      {...props}
    />
  )
  return flow ? <div className={cn('flow', className)}>{content}</div> : content
}

export default RichTextConverter
