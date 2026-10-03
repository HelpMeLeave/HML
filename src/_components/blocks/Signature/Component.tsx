'use client'

import type { SignatureData } from '@/_components/blocks/Signature/types'
import { Button } from '@/components/Button'
import { useModal } from '@payloadcms/ui/elements/Modal'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

const ConfirmationModal = dynamic(
  () => import('@payloadcms/ui/elements/ConfirmationModal').then((m) => m.ConfirmationModal),
  { ssr: false }
)

export const SignatureBlockComponent = ({
  data,
  initialValue,
  setDataAction,
}: {
  initialValue?: SignatureData
  data: SignatureData
  setDataAction: (data: SignatureData['url'] | SignatureData['points']) => void
}) => {
  const canvasRef = useRef<SignatureCanvas>(null)
  const { closeModal, openModal, isModalOpen: _isModalOpen } = useModal()

  useEffect(() => {
    if (initialValue?.url == data.url) {
      const thisRef = canvasRef.current
      thisRef?.fromDataURL(data.url)
    }
  }, [initialValue, data])

  const handlePreviousEntry = () => {
    if (data.url) {
      openModal('shouldErase')
    }
  }

  const handleClearEntry = () => {
    canvasRef.current?.clear()
    setDataAction('')
    closeModal('shouldErase')
  }

  const handleSaveEntry = () => {
    if (canvasRef.current) setDataAction(canvasRef.current.getTrimmedCanvas().toDataURL(''))
  }

  return (
    <fieldset>
      <legend className='indent-2 text-lg font-bold uppercase'>Signature Block</legend>
      <div className='field-type canvas h-40 w-md rounded-2xl border border-input-border bg-input-bg shadow-input sm:w-lg'>
        <ConfirmationModal
          body={
            'This will reset the signature block completely and erase any data already saved. Are you sure you want to continue?'
          }
          heading={'Signature Already Saved'}
          modalSlug={'shouldErase'}
          onConfirm={handleClearEntry}
          confirmLabel='Erase Signature'
          cancelLabel='Cancel'
        />
        <SignatureCanvas
          ref={canvasRef}
          dotSize={1}
          velocityFilterWeight={1}
          clearOnResize={false}
          canvasProps={{
            onClick: handlePreviousEntry,
            id: 'signature-pad',
            children: [
              <div key='unsupported'>
                Your browser does not support the signature canvas. Please CLICK HERE to type your
                name to sign the document
              </div>,
            ],
            'aria-label': 'Signature canvas. Use your mouse or touch screen to draw your signature',
            role: 'application',
            className: 'bg-transparent w-full h-full dark:invert-100 dark:hue-rotate-180',
          }}
        />
      </div>
      <Button
        className='mx-1'
        aria-controls='signature-pad'
        type='button'
        onClick={handleSaveEntry}>
        Save
      </Button>
      <Button
        aria-controls='signature-pad'
        className='mx-1'
        type='button'
        variant='ghost'
        onClick={handleClearEntry}>
        Clear
      </Button>
    </fieldset>
  )
}
