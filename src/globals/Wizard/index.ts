import { editorFull } from '@/_components/lexicals/full'
import { simpleLinkField } from '@/collections/_fields/LinkBase'
import { createRowLabel } from '@/collections/_labels/RowLabel/rowLabelEl'
import type { SupportWizard } from '@/payload-types'
import type { GlobalConfig } from 'payload'

export const WizardGlobalConfig: GlobalConfig = {
  slug: 'support-wizard',
  fields: [
    {
      type: 'array',
      name: 'modals',
      custom: {
        layout: {
          labelSize: 'large',
        },
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: createRowLabel({
            slug: 'name',
            ifEmpty: '[Modal]',
          }),
        },
        className: '**:[h3>.field-label]:text-4xl! row-label--large',
      },
      fields: [
        {
          type: 'text',
          name: 'name',
          admin: {
            description:
              'Human readable name for the modal. Used for reference, but not shown to the users',
          },
        },
        {
          type: 'richText',
          name: 'content',
          editor: editorFull(),
        },
        {
          type: 'blocks',
          name: 'actions',
          blocks: [
            {
              slug: 'action-inline',
              admin: {
                components: {
                  Label: {
                    path: '@/globals/Wizard/_components/Label',
                  },
                },
              },
              fields: [
                { type: 'text', name: 'text' },
                { type: 'radio', name: 'type', options: ['link', 'switch modals'] },
                {
                  type: 'text',
                  name: 'modal',
                  // the target is a modal row id, so deleting that modal would leave this button going nowhere
                  validate: (
                    value: string | null | undefined,
                    { data }: { data: Partial<SupportWizard> }
                  ) => {
                    if (!value) return true
                    const exists = data.modals?.some((m) => m.id == value)
                    return (
                      exists
                      || 'The modal this button switches to no longer exists. Pick another one.'
                    )
                  },
                  admin: {
                    condition: (_data, siblingData) => siblingData?.type == 'switch modals',
                    components: {
                      Field: '@/globals/Wizard/_components/SwitchModals',
                    },
                  },
                },
                simpleLinkField({
                  docOptions: {
                    collections: ['routes', 'externalResources'],
                    appearance: 'select',
                  },
                  admin: {
                    condition: (_data, siblingData) => siblingData?.type == 'link',
                  },
                }),
              ],
            },
          ],
        },
      ],
    } as const,
  ],
}
