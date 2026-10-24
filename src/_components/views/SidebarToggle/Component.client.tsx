'use client'

import { Button } from '@/components/Button'
import { ChevronLeft } from '@boxicons-pro/react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
// import './style.css'

const sidebarClassNames = [
  'min-[800px]:border-0',
  'min-[800px]:pl-0',
  'min-[800px]:shadow-[-2px_0px_3px_-2px_rgba(0,0,0,0.05)]',
  'min-[800px]:transition-all',
  'min-[800px]:duration-200',
  'min-[800px]:ease-in',
  'min-[800px]:min-w-0',
  'min-[800px]:bg-background',
  'not-has-[>.sidebar-toggle[data-state=open]]:min-[800px]:w-0',
  'min-[800px]:has-[>.sidebar-toggle[data-state=open]]:w-93.75',
  'min-[800px]:has-[>.sidebar-toggle[data-state=open]]:max-w-[33%]',
  'min-[800px]:max-[1200px]:[.template-default--nav-open_&]:has-[>.sidebar-toggle[data-state=open]]:max-w-0',
]

export const SidebarToggleClient = () => {
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  // const sidebarEl = useMemo(() => el, [el])

  useEffect(() => {
    if (!el && window) {
      const sidebar = window.document.body.querySelector('.document-fields__sidebar-wrap')
      if (sidebar && sidebar instanceof HTMLDivElement) {
        setEl(sidebar)
      }
    }
  }, [])

  // if (el) {
  //   addSidebarClassNames(el, open)
  //   el.querySelector('.document-fields__sidebar')?.classList.add('min-[800px]:overflow-x-hidden')
  // }

  useEffect(() => {
    if (!el) return
    const sidebar = el.querySelector('.document-fields__sidebar')
    el.classList.add(...sidebarClassNames)
    sidebar?.classList.add('min-[800px]:overflow-x-hidden')
    return () => {
      el.classList.remove(...sidebarClassNames)
      sidebar?.classList.remove('min-[800px]:overflow-x-hidden')
    }
  }, [el])

  return (
    el
    && createPortal(
      <span
        data-state={open ? 'open' : 'closed'}
        className='sidebar-toggle absolute top-0 -left-8.75 border-r border-ui-25 [--offset-top:calc(10vh+var(--app-header-height))] max-[800px]:hidden'>
        <Button
          className='m-0 h-[calc(100vh-var(--offset-top)-100px)] bg-transparent text-ui-600 hover:bg-ui-25/50 hover:text-accent-600'
          // tooltip='Toggle Sidebar'
          onClick={() => setOpen((p) => !p)}
          btnStyle='ghost'
          Icon={ChevronLeft}
          iconAttributes={{
            iconOnly: true,
            size: 'base',
            removePadding: true,
            rotate: open ? 180 : 0,
            className: 'transition-transform duration-200',
          }}
        />
      </span>,
      el,
      'SidebarToggle'
    )
  )
}
