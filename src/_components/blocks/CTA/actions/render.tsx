import type { CTAActionKey } from '@/_components/blocks/CTA/actions'
import { WizardButton } from '@/globals/Wizard/Component'
import { getWizardModal } from '@/globals/Wizard/query'

// How each action renders on the site, keyed like ctaActions. `satisfies` makes a missing entry a type error.
// Each entry loads its own data, so a CTA only fetches the modal its button opens.
export const ctaActionRenders = {
  'support-wizard': async (text: string) => {
    const panels = await getWizardModal({})
    return panels?.length ? <WizardButton panels={panels}>{text}</WizardButton> : null
  },
} satisfies Record<CTAActionKey, (text: string) => Promise<ReactNode>>
