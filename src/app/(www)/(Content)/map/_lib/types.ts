import type { Country } from '@/payload-types'
import { type MotionProps } from 'motion/react'

export type MapCountry = Pick<Country, 'id' | 'name' | 'mapSvgPath'>

// #region ! ---------- MAP REDUCER ----------
type tMapState = {
  hovered: string | null
  selected: string | null
  dragging: { first: boolean; current: boolean }
  boundaries: Record<string, number>
  hasVisited: boolean
}

type tMapAction =
  | {
      type: 'visited'
      details: { country: string; inView: boolean }
    }
  | {
      type: 'set-boundaries'
    }
  | { type: 'visitCookie' }
  | { type: 'countryHover'; details: string }
  | { type: 'clearHover' }
  | {
      type: 'setDragging'
      details: { first: boolean; current: boolean }
    }
  | {
      type: 'selected'
      details?: string | null
    }
  | { type: 'dragStart' }
  | { type: 'dragEnd' }

export type tMapReducer = {
  state: tMapState
  action: tMapAction
}
// #endregion ! --------------------

// #region ! ---------- COMPONENTS ----------
export type tMapSVGProps = {
  className?: string
} & MotionProps

export type tMapPathElProps = Omit<Props<'path'>, 'name'> & {
  svgPath?: string | null
  name: string
  abbr: string
}

// #endregion ! --------------------
