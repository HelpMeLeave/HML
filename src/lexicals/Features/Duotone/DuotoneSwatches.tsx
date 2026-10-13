import { $isUploadNode } from '@payloadcms/richtext-lexical/client'
import { $getNodeByKey, type LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { Moon, Sun, X } from 'lucide-react'
import { COLORS } from './_lib/COLORS'
import type { DuotoneFields, DuotoneKey, DuotoneThemed } from './_types'

const setColor = (editor: LexicalEditor, nodeKey: string, color: DuotoneThemed | null) =>
  editor.update(() => {
    const node = $getNodeByKey(nodeKey)
    if (!$isUploadNode(node)) return
    const data = node.getData()
    const fields = (data.fields ?? {}) as Partial<DuotoneFields>
    node.setData({ ...data, fields: { ...fields, duotone: { ...fields.duotone, color } } })
  })

export const DuotoneSwatches = ({
  editor,
  nodeKey,
  color,
}: {
  editor: LexicalEditor
  nodeKey: string
  color?: DuotoneThemed
}) => {
  const [active, theme = 'light'] = (color?.split('-') ?? []) as [DuotoneKey?, 'light'?]
  const flip = theme == 'light' ? 'dark' : 'light'

  return (
    <div
      className='duotone-swatches'
      role='toolbar'
      aria-label='Duotone'
      onMouseDown={(e) => e.preventDefault()}>
      {(Object.keys(COLORS) as DuotoneKey[]).map((key) => (
        <button
          key={key}
          type='button'
          title={key}
          data-state={key == active ? 'active' : undefined}
          style={{ background: COLORS[key][theme] }}
          onClick={() => setColor(editor, nodeKey, `${key}-${theme}`)}
        />
      ))}
      <button
        type='button'
        title={`Switch to ${flip}`}
        disabled={!active}
        onClick={() => active && setColor(editor, nodeKey, `${active}-${flip}`)}>
        {theme == 'light' ?
          <Sun />
        : <Moon />}
      </button>
      <button
        type='button'
        title='No duotone'
        disabled={!active}
        onClick={() => setColor(editor, nodeKey, null)}>
        <X />
      </button>
    </div>
  )
}
