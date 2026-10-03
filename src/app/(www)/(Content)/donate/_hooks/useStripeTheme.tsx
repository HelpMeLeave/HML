'use client'

import type { Appearance } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

const toStripeColor = (css: string, fallback: string) => {
  try {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return fallback
    ctx.clearRect(0, 0, 1, 1)
    ctx.fillStyle = css
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
    if (a === 0) return fallback
    const hex = (n: number) => n.toString(16).padStart(2, '0')
    return `#${hex(r)}${hex(g)}${hex(b)}`
  } catch {
    return fallback
  }
}

type Tokens = Record<Token, string>
type Token = (typeof TOKENS)[number][0]

const TOKENS = [
  ['accent', '--color-accent', '#ac162b'],
  ['accentMuted', '--color-accent-muted', '#7a2235'],
  ['background', '--color-card', '#fafafa'],
  ['foreground', '--color-foreground', '#27272a'],
  ['muted', '--color-muted', '#5e646e'],
  ['hr', '--color-hr', '#d4dadc'],
  ['inputBg', '--color-input-bg', '#ffffff'],
  ['danger', '--color-red-500', '#cb374c'],
] as const

const readTokens = (): Tokens | null => {
  if (typeof document == 'undefined') return null
  const probe = document.createElement('div')
  probe.style.cssText = 'position:absolute;left:-9999px;top:0;pointer-events:none'
  document.body.appendChild(probe)
  try {
    return Object.fromEntries(
      TOKENS.map(([name, variable, fallback]) => {
        probe.style.color = ''
        probe.style.color = `var(${variable})`
        const computed = getComputedStyle(probe).color
        return [name, toStripeColor(computed, fallback)]
      })
    ) as Tokens
  } finally {
    probe.remove()
  }
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

  return {
    theme: 'stripe',
    variables: {
      fontFamily: 'inherit',
      fontSizeBase: '1rem',
      borderRadius: '0.5rem',
      labelFontSize: '0.875rem',
      labelFontWeight: '600',
      colorPrimary: tokens.accent,
      colorBackground: tokens.background,
      colorText: tokens.foreground,
      colorTextSecondary: tokens.muted,
      colorTextPlaceholder: tokens.muted,
      colorDanger: tokens.danger,
      colorIcon: tokens.muted,
      colorIconTabSelected: tokens.accent,
    },
    rules: {
      '.Input': {
        backgroundColor: tokens.inputBg,
        borderColor: alpha(tokens.hr, 60),
        padding: '0.625rem 0.75rem',
        boxShadow: 'none',
      },
      '.Input:hover': { borderColor: alpha(tokens.accent, 50) },
      '.Input:focus': { borderColor: tokens.accent, boxShadow: 'none' },
      '.Input--invalid': { borderColor: tokens.danger, boxShadow: 'none' },
      '.Label': { color: tokens.muted },
      '.Tab': {
        backgroundColor: alpha(tokens.inputBg, 30),
        borderColor: alpha(tokens.hr, 60),
        boxShadow: 'none',
      },
      '.Tab:hover': { borderColor: alpha(tokens.accent, 50) },
      '.Tab--selected': {
        backgroundColor: alpha(tokens.accent, 100),
        borderColor: tokens.accent,
        color: tokens.accent,
        boxShadow: 'none',
      },
      '.TabIcon': {
        fill: 'none',
      },
      '.TabIcon--selected': { fill: 'lab(38.0187% -9.31695 36.5895)' },
      '.Block': { backgroundColor: 'transparent', borderColor: alpha(tokens.hr, 60) },
      '.AccordionItem': {
        borderColor: 'transparent',
      },
    },
  }
}
