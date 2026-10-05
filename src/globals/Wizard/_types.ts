import type { SupportWizard } from '@/payload-types'
import type { InlineBlockNode } from '@payloadcms/richtext-lexical/client'

export type WizardModal = Valid<Valid<SupportWizard>['modals']>[number]

export type ParsedJsonModal = Omit<WizardModal, 'content'> & {
  inlineBtns: InlineBlockNode['__fields'][]
}
