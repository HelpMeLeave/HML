import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import { Modal, ModalActions, ModalBody, ModalHeading } from '@/components/Modal'
import { P } from '@/components/primitives'
import type { WizardModal } from '@/globals/Wizard/_types'
import { WizardModalAction } from '@/globals/Wizard/Component/ModalActions'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { SerializedElementNode } from '@payloadcms/richtext-lexical/lexical'
import { type Dispatch, type SetStateAction } from 'react'

export const WizardModalEl = ({
  panel,
  open,
  setOpen,
  setPanel,
}: {
  panel: WizardModal
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setPanel: Dispatch<SetStateAction<string | null>>
}) => {
  return (
    <Modal
      size='2xl'
      open={open}
      onClose={() => {
        setPanel(null)
        setOpen(false)
      }}>
      {panel?.content && (
        <RichTextComponent
          blockType='rich-text'
          content={panel?.content as DefaultTypedEditorState}
          converterOverrides={{
            paragraph: ({ node, nodesToJSX }) => <P>{nodesToJSX({ nodes: node.children })}</P>,
            'section-hgroup': ({ node, nodesToJSX }) => {
              return (
                <ModalHeading className='mt-0'>
                  {nodesToJSX({ nodes: (node as SerializedElementNode).children })}
                </ModalHeading>
              )
            },
            'section-content': ({ node, nodesToJSX }) => {
              return (
                <ModalBody>
                  {nodesToJSX({ nodes: (node as SerializedElementNode).children })}
                </ModalBody>
              )
            },
          }}
        />
      )}
      {panel.actions && (
        <ModalActions className='justify-center'>
          {panel.actions?.map((action) => (
            <WizardModalAction
              key={action.id}
              onClick={() => {
                if (action.type == 'switch modals') {
                  action.modal && setPanel(action.modal)
                }
              }}
              node={action}
            />
          ))}
        </ModalActions>
      )}
    </Modal>
  )
}
