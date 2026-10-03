import type { SupportWizard } from '@/payload-types'
import type { SerializedInlineBlockNode } from '@payloadcms/richtext-lexical'
import type { InlineBlockNode } from '@payloadcms/richtext-lexical/client'

export type ParseFnReturn = SerializedInlineBlockNode | SerializedInlineBlockNode[] | null

export type WizardModal = Valid<Valid<SupportWizard>['modals']>[number]

export type WizardAction = Valid<WizardModal['actions']>[number]

export type ParsedJsonModal = Omit<WizardModal, 'content'> & {
  inlineBtns: InlineBlockNode['__fields'][]
}
