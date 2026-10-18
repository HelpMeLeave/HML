import { EditBtn } from '@/lexicals/Features/Duotone/_components/EditBtn'
import { Swatch } from '@/lexicals/Features/Duotone/_components/Swatch'
import {
  COLORS,
  DUOTONE_TWEAKS,
  POSITIONS,
  TWEAK_KEYS,
  TWEAK_MAX,
} from '@/lexicals/Features/Duotone/_lib/CONSTANTS'
import type {
  DuotoneFields,
  DuotoneKey,
  DuotoneThemedColor,
  DuotoneTweakFields,
} from '@/lexicals/Features/Duotone/_types'
import { cn } from '@/lib/cn'
import { $isUploadNode } from '@payloadcms/richtext-lexical/client'
import {
  $getNodeByKey,
  HISTORY_MERGE_TAG,
  type LexicalEditor,
} from '@payloadcms/richtext-lexical/lexical'
import { Grid3x3, History, Moon, RotateCcw, SlidersHorizontal, Sun, X } from 'lucide-react'
import { useRef, useState } from 'react'
import '../style.css'

type Position = DuotoneFields['duotone']['position']

const setColor = (editor: LexicalEditor, nodeKey: string, color: DuotoneThemedColor | null) =>
  editor.update(() => {
    const node = $getNodeByKey(nodeKey)
    if (!$isUploadNode(node)) return
    const data = node.getData()
    const fields = (data.fields ?? {}) as Partial<DuotoneFields>
    node.setData({ ...data, fields: { ...fields, duotone: { ...fields.duotone, color } } })
  })

const setData = (
  editor: LexicalEditor,
  nodeKey: string,
  patch: Partial<DuotoneFields['duotone']>,
  merge = false
) =>
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
  position,
  isCover,
}: {
  editor: LexicalEditor
  nodeKey: string
  color?: DuotoneThemedColor
  tweaks?: DuotoneTweakFields
  saved?: DuotoneTweakFields
  position?: Position
  isCover?: boolean
}) => {
  const [active, theme = 'light'] = (color?.split('-') ?? []) as [DuotoneKey?, 'light'?]
  const flip = theme == 'light' ? 'dark' : 'light'
  const drag = useRef<'idle' | 'start' | 'moving'>('idle')
  // const [open, setOpen] = useState(false)
  // const showSliders = open && Boolean(active)
  const [panel, setPanel] = useState<'sliders' | 'position' | null>(null)
  const showSliders = panel == 'sliders' && Boolean(active)
  const showPosition = panel == 'position' && Boolean(isCover)
  const toggle = (name: typeof panel) => setPanel(panel == name ? null : name)
  const isSaved = TWEAK_KEYS.every((k) => (tweaks?.[k] ?? null) == (saved?.[k] ?? null))
  const isDefault = TWEAK_KEYS.every((k) => tweaks?.[k] == null)

  return (
    <>
      <div
        // className='duotone-swatches pointer-events-auto absolute top-2 z-1 flex w-8 max-w-8 flex-col items-center gap-1 rounded-xl p-2 px-4 shadow-sm transition-all *:[--border-radius:999px]'
        // className='duotone-swatches pointer-events-auto absolute top-2 left-full z-1 ml-2 flex w-8 max-w-8 flex-col items-center gap-1 rounded-xl p-2 px-4 shadow-sm transition-all *:[--border-radius:999px]'
        className='duotone-swatches min-[900px]:sidebar-open:top-auto min-[900px]:sidebar-open:bottom-full min-[900px]:sidebar-open:left-0 min-[900px]:sidebar-open:w-auto min-[900px]:sidebar-open:max-w-none min-[900px]:sidebar-open:flex-row min-[900px]:sidebar-open:px-2 pointer-events-auto absolute bottom-full left-0 z-1 flex items-center gap-1 rounded-xl p-2 transition-all *:[--border-radius:999px] min-[900px]:top-2 min-[900px]:bottom-auto min-[900px]:left-full min-[900px]:w-8 min-[900px]:max-w-8 min-[900px]:flex-col min-[900px]:px-4'
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
          // onClick={() => setOpen(!open)}
          onClick={() => toggle('sliders')}
        />

        {isCover && (
          <EditBtn
            tooltip={showPosition ? 'Hide text position' : 'Text position'}
            icon={<Grid3x3 className='size-4!' />}
            active={showPosition}
            onClick={() => toggle('position')}
          />
        )}
      </div>
      {isCover && (
        <div
          role='radiogroup'
          aria-label='Text position'
          className={cn(
            // 'bg-elevation-0/85 pointer-events-auto absolute top-2 right-2 z-2 grid grid-cols-3 gap-1 rounded-xl p-2 shadow-sm backdrop-blur-sm transition-opacity in-data-[position*=right]:right-auto in-data-[position*=right]:left-2 in-data-[position*=top]:top-auto in-data-[position*=top]:bottom-2',
            'bg-elevation-0/85 pointer-events-auto absolute top-2 right-2 z-2 grid grid-cols-3 gap-1 rounded-xl p-2 shadow-sm backdrop-blur-sm transition-opacity',
            !showPosition && 'pointer-events-none opacity-0'
          )}
          onMouseDown={(e) => e.preventDefault()}>
          {POSITIONS.map((value) => (
            <button
              key={value}
              type='button'
              role='radio'
              title={value}
              aria-label={value}
              aria-checked={(position ?? 'bottom left') == value}
              className='group/dot hover:bg-elevation-100 grid size-6 cursor-pointer appearance-none place-items-center rounded-md border-0 bg-transparent p-0'
              onClick={() => setData(editor, nodeKey, { position: value })}>
              <span className='bg-elevation-400 group-hover/dot:bg-elevation-600 group-aria-checked/dot:bg-secondary-500 size-1.5 rounded-full transition-all group-aria-checked/dot:size-2.5' />
            </button>
          ))}
        </div>
      )}
      <div
        role='group'
        aria-label='Duotone adjustments'
        className={cn(
          // 'bg-elevation-0/85 pointer-events-auto absolute top-2 left-12 z-1 grid w-64 grid-cols-[auto_1fr_2.75rem_auto] items-center gap-x-2 gap-y-1 rounded-xl px-3 py-2 text-xs text-(--theme-text) shadow-sm backdrop-blur-sm transition-opacity',
          // 'bg-elevation-0/85 pointer-events-auto absolute top-2 right-2 z-1 grid w-64 grid-cols-[auto_1fr_2.75rem_auto] items-center gap-x-2 gap-y-1 rounded-xl px-3 py-2 text-xs text-(--theme-text) shadow-sm backdrop-blur-sm transition-opacity',
          'bg-elevation-0/85 pointer-events-auto absolute top-2 right-2 z-2 grid w-64 grid-cols-[auto_1fr_2.75rem_auto] items-center gap-x-2 gap-y-1 rounded-xl px-3 py-2 text-xs text-(--theme-text) shadow-sm backdrop-blur-sm transition-opacity in-data-[position*=right]:right-auto in-data-[position*=right]:left-2 in-data-[position*=top]:top-auto in-data-[position*=top]:bottom-2',
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
              [
                'Revert to saved',
                History,
                isSaved,
                (k: keyof DuotoneTweakFields) => saved?.[k] ?? null,
              ],
              ['Reset to defaults', RotateCcw, isDefault, () => null],
            ] as const
          ).map(([label, Icon, disabled, valueOf]) => (
            <button
              key={label}
              type='button'
              title={label}
              aria-label={label}
              disabled={disabled}
              className='hover:bg-elevation-100 grid size-6 cursor-pointer appearance-none place-items-center rounded-md border-0 bg-transparent p-0 text-(--theme-text) disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent'
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
