import type { Tag } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type tSubSectionContext = {
  open: boolean
  handleToggle: () => void
  type: 'default' | 'grey'
}

export type tSubSectionProps = Omit<Props<'button'>, 'type' | 'title'> & {
  defaultOpen?: boolean
  type?: 'default' | 'grey'
  onOpen?: () => void
  onClose?: () => void
  onToggle?: (open: boolean) => void
  variant?: import('@/lib/slots').HeadingVariant
  heading?: ReactNode
}

export type MainDetails = {
  type: string | Tag
  contentType: string
  'other-brow'?: DefaultTypedEditorState
}
