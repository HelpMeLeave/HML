import { EditBtn } from '@/lexicals/Features/Duotone/_components/EditBtn'
import { Swatch } from '@/lexicals/Features/Duotone/_components/Swatch'
import { COLORS } from '@/lexicals/Features/Duotone/_lib/COLORS'
import { DUOTONE_TWEAKS, type DuotoneTweaks } from '@/lexicals/Features/Duotone/_lib/filter'
import type { DuotoneFields, DuotoneKey, DuotoneThemed } from '@/lexicals/Features/Duotone/_types'
import { cn } from '@/lib/cn'
import { $isUploadNode } from '@payloadcms/richtext-lexical/client'
import {
  $getNodeByKey,
  HISTORY_MERGE_TAG,
  type LexicalEditor,
} from '@payloadcms/richtext-lexical/lexical'
import { History, Moon, RotateCcw, SlidersHorizontal, Sun, X } from 'lucide-react'
import { useRef, useState } from 'react'
import '../style.css'

const TWEAK_MAX: Record<keyof DuotoneTweaks, number> = {
  brightness: 200,
  contrast: 400,
  grayscale: 100,
}

const setColor = (editor: LexicalEditor, nodeKey: string, color: DuotoneThemed | null) =>
  editor.update(() => {
    const node = $getNodeByKey(nodeKey)
    if (!$isUploadNode(node)) return
    const data = node.getData()
    const fields = (data.fields ?? {}) as Partial<DuotoneFields>
    node.setData({ ...data, fields: { ...fields, duotone: { ...fields.duotone, color } } })
  })
const TWEAK_KEYS = Object.keys(DUOTONE_TWEAKS) as (keyof DuotoneTweaks)[]

const setData = (editor: LexicalEditor, nodeKey: string, patch: DuotoneTweaks, merge = false) =>
  editor.update(
    () => {
      const node = $getNodeByKey(nodeKey)
      if (!$isUploadNode(node)) return
      const data = node.getData()
      const fields = (data.fields ?? {}) as Partial<DuotoneFields>
      node.setData({ ...data, fields: { ...fields, duotone: { ...fields.duotone, ...patch } } })
    },
    merge ? { tag: HISTORY_MERGE_TAG } : undefined
  )

export const DuotoneSwatches = ({
  editor,
  nodeKey,
  color,
  tweaks,
  saved,
}: {
  editor: LexicalEditor
  nodeKey: string
  color?: DuotoneThemed
  tweaks?: DuotoneTweaks
  saved?: DuotoneTweaks
}) => {
  const [active, theme = 'light'] = (color?.split('-') ?? []) as [DuotoneKey?, 'light'?]
  const flip = theme == 'light' ? 'dark' : 'light'
  const drag = useRef<'idle' | 'start' | 'moving'>('idle')
  const [open, setOpen] = useState(false)
  const showSliders = open && Boolean(active)
  const isSaved = TWEAK_KEYS.every((k) => (tweaks?.[k] ?? null) == (saved?.[k] ?? null))
  const isDefault = TWEAK_KEYS.every((k) => tweaks?.[k] == null)

  return (
    <>
      <div
        className='duotone-swatches pointer-events-auto absolute top-2 z-1 flex w-8 max-w-8 flex-col items-center gap-1 rounded-xl p-2 px-4 shadow-sm transition-all *:[--border-radius:999px]'
        role='toolbar'
        aria-label='Duotone'
        onMouseDown={(e) => e.preventDefault()}>
        {(Object.keys(COLORS) as DuotoneKey[]).map((key) => (
          <Swatch
            active={active}
            title={key}
            key={key}
            theme={theme}
            setColor={() => setColor(editor, nodeKey, `${key}-${theme}`)}
          />
        ))}

        <EditBtn
          tooltip={`Switch to ${flip}`}
          icon={theme == 'light' ? <Sun className='size-4!' /> : <Moon className='size-4!' />}
          disabled={!active}
          onClick={() => active && setColor(editor, nodeKey, `${active}-${flip}`)}
        />

        <EditBtn
          tooltip='No duotone'
          icon={<X className='size-4!' />}
          disabled={!active}
          onClick={() => setColor(editor, nodeKey, null)}
        />

        <EditBtn
          tooltip={showSliders ? 'Hide adjustments' : 'Adjust'}
          icon={<SlidersHorizontal className='size-4!' />}
          disabled={!active}
          active={showSliders}
          onClick={() => setOpen(!open)}
        />
      </div>
      <div
        role='group'
        aria-label='Duotone adjustments'
        className={cn(
          'bg-elevation-0/85 pointer-events-auto absolute top-2 left-12 z-1 grid w-64 grid-cols-[auto_1fr_2.75rem_auto] items-center gap-x-2 gap-y-1 rounded-xl px-3 py-2 text-xs text-(--theme-text) shadow-sm backdrop-blur-sm transition-opacity',
          !showSliders && 'pointer-events-none opacity-0'
        )}
        onKeyDown={(e) => !e.metaKey && !e.ctrlKey && e.stopPropagation()}>
        {TWEAK_KEYS.map((key) => {
          const value = tweaks?.[key] ?? DUOTONE_TWEAKS[key]
          return (
            <label
              key={key}
              className='contents'
              title='Double-click to reset'
              onDoubleClick={() => setData(editor, nodeKey, { [key]: null })}>
              <span className='capitalize'>{key}</span>
              <input
                type='range'
                name={key}
                min={0}
                max={TWEAK_MAX[key]}
                step={5}
                disabled={!active}
                value={value}
                className='h-1 w-full cursor-pointer accent-(--color-secondary-500)'
                onPointerDown={() => (drag.current = 'start')}
                onPointerUp={() => (drag.current = 'idle')}
                onChange={({ currentTarget }) => {
                  setData(
                    editor,
                    nodeKey,
                    { [key]: currentTarget.valueAsNumber },
                    drag.current == 'moving'
                  )
                  if (drag.current == 'start') drag.current = 'moving'
                }}
              />
              <output
                className={cn(
                  'text-right tabular-nums',
                  tweaks?.[key] == null && 'text-elevation-500'
                )}>
                {value}%
              </output>
            </label>
          )
        })}
        <div className='border-elevation-150 col-start-4 row-span-3 row-start-1 flex flex-col justify-center gap-1 self-stretch border-l pl-2'>
          {(
            [
              ['Revert to saved', History, isSaved, (k: keyof DuotoneTweaks) => saved?.[k] ?? null],
              ['Reset to defaults', RotateCcw, isDefault, () => null],
            ] as const
          ).map(([label, Icon, disabled, valueOf]) => (
            <button
              key={label}
              type='button'
              title={label}
              aria-label={label}
              disabled={disabled}
              className='hover:bg-elevation-100 grid size-6 cursor-pointer place-items-center rounded-md disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent'
              onClick={() =>
                setData(editor, nodeKey, Object.fromEntries(TWEAK_KEYS.map((k) => [k, valueOf(k)])))
              }>
              <Icon className='size-3.5' />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
