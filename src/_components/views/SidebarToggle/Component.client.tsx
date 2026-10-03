'use client'

import { Button } from '@payloadcms/ui'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import './style.scss'

export const SidebarToggleClient = () => {
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const sidebarEl = useMemo(() => el, [el])

  useEffect(() => {
    if (!el && window) {
      const sidebar = window.document.body.querySelector('.document-fields__sidebar-wrap')
      if (sidebar && sidebar instanceof HTMLDivElement) {
        setEl(sidebar)
      }
    }
  }, [])

  return (
    sidebarEl
    && createPortal(
      <span
        data-open={open ? '' : undefined}
        className='sidebar-toggle'>
        <Button
          size='small'
          tooltip='Toggle Sidebar'
          onClick={() => setOpen((p) => !p)}
          buttonStyle='subtle'
          icon={<ChevronLeft />}
        />
      </span>,
      sidebarEl,
      'SidebarToggle'
    )
  )
}
