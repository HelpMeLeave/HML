import {
  FixedToolbarFeature as LexicalFixedToolbarFeature,
  type ToolbarGroup,
} from '@payloadcms/richtext-lexical'

type CustomGroup = Record<
  string,
  | Partial<
      Omit<
        Extract<
          ToolbarGroup,
          {
            type: 'button'
          }
        >,
        'items' | 'key'
      >
    >
  | Partial<Omit<ToolbarGroup, 'isEnabled' | 'items' | 'key'>>
>

const customGroups = [
  { key: 'layout', type: 'dropdown' },
  { key: 'format', type: 'buttons' },
  { key: 'features', type: 'buttons' },
  { key: 'text', type: 'dropdown' },
  { key: 'indent', type: 'buttons' },
  {},
  {},
  { key: 'blocks', type: 'dropdown' },
  { key: 'add', type: 'dropdown' },
].reduce((prev, { key, type }, i) => {
  if (!key) return prev
  prev[key] = { type: type as ToolbarGroup['type'], order: i + 1 }
  return prev
}, {} as CustomGroup)

export const FixedToolbarFeature = LexicalFixedToolbarFeature({ customGroups })
