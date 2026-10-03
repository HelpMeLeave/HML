import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as ConvertRichText, type JSXConverters } from '@payloadcms/richtext-lexical/react'
import { jsxConverters } from './jsxConverters'

export type RichTextProps = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  converterOverrides?: JSXConverters
  pageType?: string
} & Props<'div'>

export default function RichTextConverter({ className, ...props }: RichTextProps) {
  return (
    <>
      <ConvertRichText
        converters={jsxConverters(props.converterOverrides)}
        disableContainer
        disableTextAlign
        className={className}
        {...props}
      />
    </>
  )
}
