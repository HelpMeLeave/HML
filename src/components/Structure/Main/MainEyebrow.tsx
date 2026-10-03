import type { MainDetails } from '@/components/Structure/_types'
import { Eyebrow } from '@/components/Structure/Eyebrow'
import { MainBreadcrumb } from '@/components/Structure/Main/index.client'
import { toTitleCase } from '@/lib/textCasing'
import type { Content, Tag } from '@/payload-types'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

const getBrow = (pageDetails?: MainDetails) => {
  if (pageDetails) {
    if ('other-brow' in pageDetails && pageDetails['other-brow']) {
      return toTitleCase(convertLexicalToPlaintext({ data: pageDetails['other-brow'] }))
    } else {
      return toTitleCase(
        'type' in pageDetails && pageDetails.type ? ((pageDetails as Content).type as Tag).display
        : 'contentType' in pageDetails && pageDetails.contentType ? pageDetails.contentType
        : null
      )
    }
  }
}

export const MainEyebrow = ({
  baseLink,
  pageDetails,
  ...props
}: Props & {
  baseLink?: string
  pageDetails?: MainDetails
}) => {
  props.children = getBrow(pageDetails)

  if (props.children) {
    return (
      <Eyebrow
        data-slot='eyebrow'
        {...props}
      />
    )
  }
  return (
    <MainBreadcrumb
      data-slot='eyebrow'
      baseLink={baseLink}
    />
  )
}
