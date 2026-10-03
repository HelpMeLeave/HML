'use client'
import { useTransition } from '@/_config/plugins/Plugin-Workflow/_components/FlowControls/useTransition'
import type { FlowButton } from '@/_config/plugins/Plugin-Workflow/_lib/parseFlow'
import { Button, Drawer, TextareaInput, useDrawerSlug, useModal } from '@payloadcms/ui'
import { useState } from 'react'

/** Collects the reason before the press goes through. The server refuses an affordance declaring `requireNotes` without one — this is how it gets supplied, not what enforces it. */
export const NoteDrawer = ({ button }: { button: FlowButton }) => {
  const { to, admin, btnStyle, btnLabel } = button
  const slug = useDrawerSlug(`workflow-note-${to}-${admin?.actionKey ?? ''}`)
  const { openModal, closeModal } = useModal()
  const transition = useTransition()
  const [note, setNote] = useState('')

  return (
    <>
      <Button
        type='button'
        buttonStyle={btnStyle}
        onClick={() => openModal(slug)}>
        {btnLabel}
      </Button>

      <Drawer
        slug={slug}
        title={btnLabel}>
        <TextareaInput
          path='workflow-note'
          label='Reason'
          required
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />

        <span className='flex items-center gap-4 pt-4'>
          <Button
            type='button'
            buttonStyle='primary'
            // The server refuses an empty note anyway; disabling here only saves a round trip to be told so.
            disabled={!note.trim()}
            onClick={async () => {
              closeModal(slug)
              await transition({
                to,
                actionKey: admin?.actionKey,
                transitionNote: note,
              })
            }}>
            {btnLabel}
          </Button>
          <Button
            type='button'
            buttonStyle='secondary'
            onClick={() => closeModal(slug)}>
            Cancel
          </Button>
        </span>
      </Drawer>
    </>
  )
}
