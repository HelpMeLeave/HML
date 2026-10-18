import type { ToolbarActionItem } from '@/lexicals/Features/ActionToolbar/_types'
import { fromCamelCase } from '@/lib/textCasing'
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  type BaseSelection,
  type LexicalCommand,
  type LexicalEditor,
  type TextFormatType,
} from '@payloadcms/richtext-lexical/lexical'
import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  type LucideIcon,
} from 'lucide-react'

type PaylodFnType<P> = (editor?: LexicalEditor) => P
type Payload<P> = P | PaylodFnType<P>

export type CommandAction<P> = ToolbarActionItem & {
  command: LexicalCommand<P>
  payload: Payload<P>
}

type CommandActionOpts<P> = {
  slug: string
  label?: string
  Icon: LucideIcon
  command: LexicalCommand<P>
  payload: Payload<P>
  $isActive?: ToolbarActionItem['$isActive']
  $isEnabled?: ToolbarActionItem['$isEnabled']
  /** Replaces dispatching `command` for actions Lexical has no command for. */
  onSelect?: ToolbarActionItem['onSelect']
  hideIfDisabled?: boolean
}

const resolvePayload = <P, _>(payload: Payload<P>, editor?: LexicalEditor) =>
  typeof payload == 'function' ? (payload as (editor?: LexicalEditor) => P)(editor) : payload

export const createCommandAction = <P, _>({
  slug,
  label,
  command,
  payload,
  onSelect,
  $isActive = () => false,
  $isEnabled = () => true,
  ...rest
}: CommandActionOpts<P>): CommandAction<P> => ({
  ...rest,
  slug,
  command,
  payload,
  $isActive,
  $isEnabled,
  label: label ?? fromCamelCase(slug),
  onSelect:
    onSelect ?? ((editor) => editor?.dispatchCommand(command, resolvePayload(payload, editor))),
})

const $rangeSelection = (selection: BaseSelection | null = $getSelection()) =>
  $isRangeSelection(selection) ? selection : null

const createFormatAction = (format: TextFormatType, Icon: LucideIcon, label?: string) =>
  createCommandAction({
    slug: format,
    label,
    Icon,
    command: FORMAT_TEXT_COMMAND,
    payload: format,
    $isActive: (props) => Boolean($rangeSelection(props?.selection)?.hasFormat(format)),
    $isEnabled: () => Boolean($rangeSelection()),
  })

export const BoldAction = createFormatAction('bold', Bold)
export const ItalicAction = createFormatAction('italic', Italic)
export const UnderlineAction = createFormatAction('underline', Underline)
export const StrikethroughAction = createFormatAction('strikethrough', Strikethrough)
export const SubscriptAction = createFormatAction('subscript', Subscript)
export const SuperscriptAction = createFormatAction('superscript', Superscript)
export const InlineCodeAction = createFormatAction('code', Code, 'Inline Code')

export const InlineFormatActions = [
  BoldAction,
  ItalicAction,
  UnderlineAction,
  StrikethroughAction,
  SubscriptAction,
  SuperscriptAction,
  InlineCodeAction,
]
