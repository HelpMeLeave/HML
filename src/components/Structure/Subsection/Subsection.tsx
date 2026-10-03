'use client'
import type { tSubSectionProps } from '@/components/Structure/_types'
import { SubSectionContext } from '@/components/Structure/Subsection/CTX'
import { cn } from '@/lib/cn'
import { useCallback, useMemo, useState } from 'react'

export const Subsection = ({
  defaultOpen = true,
  type = 'default',
  onOpen,
  onClose,
  onToggle,
  ...props
}: tSubSectionProps) => {
  const [open, setOpen] = useState(defaultOpen)

  const handleToggle = useCallback(() => {
    if (onOpen && !open) {
      onOpen()
      setOpen(true)
      return
    } else if (onClose && open) {
      onClose()
      setOpen(false)
      return
    } else if (onToggle) {
      onToggle(!open)
      setOpen((prev) => !prev)
    } else {
      setOpen((prev) => !prev)
    }
  }, [onOpen, onClose, onToggle, open])

  const contextValue = useMemo(
    () => ({
      open,
      handleToggle,
      type,
    }),
    [open, handleToggle, type]
  )

  return (
    <section
      data-open={open ? '' : undefined}
      data-slot='subsection'
      className={cn('transition-all *:not-[h3]:pr-4 *:[h3]:-ml-4')}>
      <SubSectionContext.Provider value={contextValue}>{props.children}</SubSectionContext.Provider>
    </section>
  )
}

export { SubsectionContent } from './SubsectionContent'
export { SubsectionHeading } from './SubsectionHeading'
