'use client'

import { Button } from '@/components/Button'
import type { WizardModal } from '@/globals/Wizard/_types'
import { WizardModalEl } from '@/globals/Wizard/Component/Modal'
import { useState } from 'react'

// A real component rather than a hook that hands back components, which React remounted on every render
export const WizardButton = ({
  children,
  panels,
}: {
  children: ReactNode
  panels: WizardModal[]
}) => {
  const [open, setOpen] = useState(false)
  const [panelID, setPanelID] = useState<string | null>(null)

  const panel = panels.find((m) => m.id == panelID)

  return (
    <>
      <Button
        as='button'
        onClick={() => {
          setOpen(true)
          setPanelID(panels[0]?.id ?? null)
        }}
        className='max-h-min border-0 bg-accent text-white'
        variant='primary'>
        {children}
      </Button>
      {panel && (
        <WizardModalEl
          panel={panel}
          open={open}
          setOpen={setOpen}
          setPanel={setPanelID}
        />
      )}
    </>
  )
}
