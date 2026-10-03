'use client'

import { Button } from '@/components/Button'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { X } from 'lucide-react'
import Link from 'next/link'
import type { tNavFetchCTX } from 'www/_providers/_types'

export const MobileIndex = ({
  open,
  onClose,
  sections,
  currentSection,
}: Props<typeof Dialog> & {
  open: boolean
  onClose: () => void
  sections: tNavFetchCTX['topNav']
  currentSection?: string
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      transition
      className='z-99 transition-all duration-300 ease-out data-closed:opacity-0 md:hidden'>
      <div className='fixed inset-0 z-99 w-screen overflow-y-auto bg-background'>
        <div className='flex min-h-full items-start justify-center'>
          <DialogPanel className='h-full w-full'>
            <DialogTitle
              className={
                'flex w-full items-center justify-between border-b border-hr-muted p-3 px-4'
              }>
              <span className='font-serif text-3xl tracking-widest'>INDEX</span>
              <Button
                variant='ghost'
                type='button'
                onClick={onClose}
                aria-label='Close index'
                className='-mt-1 grid size-11 place-items-center outline-0 transition-colors hocus:text-accent'>
                <X
                  aria-hidden
                  className='size-5'
                />
              </Button>
            </DialogTitle>

            <div className='px-4 pt-5 pb-10'>
              {sections.map((section) => {
                const here = section.slug == currentSection
                return (
                  <section
                    key={section.slug}
                    className='mb-7'>
                    <Link
                      href={section.url ?? ''}
                      prefetch={false}
                      onClick={onClose}
                      className={cnHead(here)}>
                      <span className='font-header text-4xl leading-[0.85] tracking-wide text-soft transition hocus:text-accent'>
                        {section.displayText}
                      </span>
                      {here && (
                        <span className='border border-accent px-1.5 py-0.5 text-[0.575rem] font-bold tracking-[0.2em] whitespace-nowrap text-accent'>
                          YOU ARE HERE
                        </span>
                      )}
                    </Link>

                    {section.links.length > 0 ?
                      <ul>
                        {section.links.map((child) => (
                          <li key={child.url}>
                            <Link
                              href={child.url}
                              prefetch={false}
                              onClick={onClose}
                              className='flex min-h-11 items-center border-b border-accent-muted/30 py-3 text-lg leading-snug tracking-wider text-soft/65 uppercase hover:text-soft focus-visible:text-accent active:text-accent'>
                              {child.displayText}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    : <p className='pt-3 text-sm leading-relaxed text-muted'>
                        {section.description}
                      </p>
                    }
                  </section>
                )
              })}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

const cnHead = (here: boolean) =>
  [
    'flex items-center justify-between gap-3.5 pt-2.5 ',
    here ? 'border-accent text-accent' : 'text-body',
  ].join(' ')
