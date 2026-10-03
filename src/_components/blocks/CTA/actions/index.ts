// Every modal a CTA's primary button can open. `label` is only what editors see in the action dropdown; the button text always comes from the editor.
// Kept free of server and React imports because the block config loads it.
export const ctaActions = {
  'support-wizard': { label: 'Open Support Wizard' },
} as const

export type CTAActionKey = keyof typeof ctaActions

export const ctaActionOptions = Object.entries(ctaActions).map(([value, { label }]) => ({
  value,
  label,
}))
