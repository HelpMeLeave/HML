import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { type LucideIcon } from 'lucide-react'

export type ToolbarAction = {
  slug: string
  features: string[]
  $visible: (slug?: string) => boolean
  $getKeys: () => Record<string, Nullish<string>>
  groups: ToolbarActionGroup[]
}

export type ToolbarActionGroup = {
  toolbar: string
  slug: string
  features: string[]
  $include: () => boolean | null
  $getKey: () => Nullish<string>
  entries: ToolbarActionItem[]
} & (ToolbarActionDropdownGroup | ToolbarActionButtonGroup)

export type ToolbarActionDropdownGroup = { type: 'dropdown'; label: string; Icon: LucideIcon }
export type ToolbarActionButtonGroup = { type: 'buttons' }

export type ToolbarActionItem = {
  slug: string
  label: string
  Icon: LucideIcon
  isActive: () => boolean
  $isEnabled: (editor?: LexicalEditor) => boolean
  onSelect: (editor?: LexicalEditor) => void
  hideIfDisabled?: boolean
}
