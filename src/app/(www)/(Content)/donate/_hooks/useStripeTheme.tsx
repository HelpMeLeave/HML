'use client'

import { toHex } from '@/lib/convertColors/toHex'
import type { Appearance } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

// const toStripeColor = (css: string, fallback: string) => {
//   try {
//     const canvas = document.createElement('canvas')
//     canvas.width = canvas.height = 1
//     const ctx = canvas.getContext('2d', { willReadFrequently: true })
//     if (!ctx) return fallback
//     ctx.clearRect(0, 0, 1, 1)
//     ctx.fillStyle = css
//     ctx.fillRect(0, 0, 1, 1)
//     const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
//     if (a === 0) return fallback
//     const hex = (n: number) => n.toString(16).padStart(2, '0')
//     return `#${hex(r)}${hex(g)}${hex(b)}`
//   } catch {
//     return fallback
//   }
// }

type Tokens = Record<Token, string>
type Token = (typeof TOKENS)[number][0]

const TOKENS = [
  ['accent', '--color-accent', '#ac162b'],
  ['accentMuted', '--color-accent-muted', '#7a2235'],
  ['background', '--color-card', '#f7f7f7'],
  ['foreground', '--color-body', '#27272a'],
  ['muted', '--color-muted', '#5e646e'],
  ['hr', '--color-hr', '#d4dadc'],
  ['danger', '--color-red-500', '#cb374c'],
  ['inputBg', '--color-input-bg', '#ffffff'],
  ['inputBorder', '--color-input-border', '#d1d4d3'],
] as const

const readTokens = (): Tokens | null => {
  const rootStyles = getComputedStyle(document.documentElement)

  const check = (val: string, fallback: string) => {
    const computedValue = (
      rootStyles.getPropertyValue(val)
      ?? rootStyles.getPropertyValue(fallback)
      ?? ''
    )
      .trim()
      .replaceAll('%', '')

    if (computedValue == 'white') {
      return '#FFFFFF'
    }

    if (computedValue.startsWith('lab')) {
      const labColor = computedValue
        ?.trim()
        ?.replace(/.+\((.+)\)/, '$1')
        ?.split(' ')
        ?.map((ea) => Number(ea.replace('%', '').trim()))

      if (labColor) {
        return toHex.fromLab({ l: labColor[0], a: labColor[1], b: labColor[2], alpha: labColor[3] })
      }
    }

    if (computedValue.startsWith('#') || !computedValue.startsWith('--')) return computedValue
    return ''
  }

  return Object.fromEntries(
    TOKENS.map(([name, variable, base]) => {
      const computed = check(variable, base)
      return [name, computed]
    })
  ) as Tokens
}

const alpha = (hex: string, percent: number) => {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${(percent / 100).toFixed(2)})`
}

export const useStripeTheme = (): Appearance => {
  const [tokens, setTokens] = useState<Tokens | null>(null)

  useEffect(() => {
    const sync = () => setTokens(readTokens())
    sync()

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', sync)

    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme'],
    })

    return () => {
      mq.removeEventListener('change', sync)
      observer.disconnect()
    }
  }, [])

  if (!tokens) return { theme: 'stripe', variables: { fontFamily: 'inherit' } }

  const focusMuted = alpha(tokens.accentMuted, 50)
  const mutedShadow = `0px 0px 0px 1px ${focusMuted}`
  const inputColorBorder = alpha(tokens.inputBorder, 50)
  const hr = alpha(tokens.hr, 60)
  const boxShadow = 'none'
  const borderColor = hr

  return {
    theme: 'stripe',
    variables: {
      borderRadius: '0.5rem',
      colorBackground: tokens.background,
      colorDanger: tokens.danger,
      colorIcon: tokens.muted,
      colorIconTabSelected: tokens.accent,
      colorPrimary: tokens.accent,
      colorText: tokens.foreground,
      colorTextPlaceholder: tokens.muted,
      colorTextSecondary: tokens.muted,
      fontFamily: 'inherit',
      fontSizeBase: '1rem',
      iconColor: tokens.accent,
      inputBoxShadow: 'none',
      inputColorBorder,
      inputFocusColorBorder: tokens.accent,
      labelFontSize: '0.875rem',
      labelFontWeight: '600',
      labelColorText: tokens.muted,
      focusBoxShadow: 'none',
    },
    rules: {
      '.Input': {
        backgroundColor: tokens.inputBg,
        padding: '0.625rem 0.75rem',
        fontSize: '0.875rem',
      },
      '.Input:hover': { boxShadow: mutedShadow },
      '.Error': { fontSize: '0.75rem' },
      '.Tab': { backgroundColor: alpha(tokens.inputBg, 30), borderColor, boxShadow },
      '.Tab:hover': { boxShadow: mutedShadow },
      '.Tab--selected': { color: tokens.accent, boxShadow },
      '.TabIcon': { fill: 'none' },
      '.TabIcon--selected': { fill: tokens.accent },
      '.Block': { backgroundColor: 'transparent', borderColor },
      '.AccordionItem': {
        borderColor: alpha(tokens.inputBorder, 75),
        backgroundColor: alpha(tokens.inputBg, 50),
        boxShadow,
      },
      '.AccordionItem:hover': { boxShadow: `0px 0px 0px 1px ${alpha(tokens.inputBorder, 20)}` },
      '.ToggleItem': { boxShadow, color: tokens.foreground },
      '.ToggleItem--selected': { borderColor: tokens.accentMuted, boxShadow },
    },
  }
}
