import { DUOTONES } from './_lib/DUOTONES'
import type { DuotonePreset } from './_types'

const tableValues = (preset: DuotonePreset, i: 0 | 1 | 2) => {
  const channel = (hex: string, i: 0 | 1 | 2) =>
    (parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255).toFixed(3)

  return `${channel(preset.shadow, i)} ${channel(preset.highlight, i)}`
}

export const DuotoneFilters = () => (
  <svg
    aria-hidden
    focusable='false'
    width='0'
    height='0'
    style={{ position: 'absolute', pointerEvents: 'none' }}>
    {DUOTONES.map((preset) => (
      <filter
        key={preset.value}
        id={`duotone-${preset.value}`}
        colorInterpolationFilters='sRGB'>
        <feColorMatrix
          type='saturate'
          values='0'
        />
        <feComponentTransfer>
          <feFuncR
            type='table'
            tableValues={tableValues(preset, 0)}
          />
          <feFuncG
            type='table'
            tableValues={tableValues(preset, 1)}
          />
          <feFuncB
            type='table'
            tableValues={tableValues(preset, 2)}
          />
        </feComponentTransfer>
      </filter>
    ))}
  </svg>
)
