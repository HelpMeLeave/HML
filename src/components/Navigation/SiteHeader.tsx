'use client'

import type { tNavFetchCTX, tNavFetchTopNavItem } from '@/app/(www)/_providers/_types'
import { Logo } from '@/components/Logo'
import { MobileIndex } from '@/components/Navigation/MobileIndex'
import { SectionHeader } from '@/components/Navigation/SectionLink'
import { SectionPanel } from '@/components/Navigation/SectionPanel'
import { useKeyboard } from '@/hooks/useKeyboard'
import { cn } from '@/lib/cn'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

const MobileMenu = ({
  setIndexOpen,
  indexOpen,
}: {
  setIndexOpen: Dispatch<SetStateAction<boolean>>
  indexOpen: boolean
}) => {
  return (
    <button
      type='button'
      onClick={() => setIndexOpen(true)}
      aria-label='Open index'
      aria-expanded={indexOpen}
      className={cn(
        'ml-auto grid size-(--nav-height) shrink-0 click place-items-center',
        'interactive transition-colors hover:text-accent',
        'md:hidden'
      )}>
      <Menu
        aria-hidden
        className='size-5'
      />
    </button>
  )
}

const NavSectionLogo = () => (
  <Link
    href='/'
    prefetch={false}
    className={cn(
      'flex h-(--nav-height) max-h-(--nav-height) items-center font-header text-2xl dark:text-accent-200',
      'group relative md:basis-(--nav-height) xl:pr-9'
    )}>
    <span className='top-0 size-(--nav-height) h-full interactive *:transition-colors md:absolute md:grid md:max-h-(--nav-height) md:w-fit'>
      <Logo
        logoType='mark'
        mark='uppercase'
        textBackground='text-background'
        className='top-0 left-0 hidden h-full max-h-(--nav-height) w-full p-2 text-accent group-hocus:text-body md:block'
      />
      <Logo
        logoType='mark'
        mark='filled'
        className='aspect-square h-(--nav-height) w-(--nav-height) p-4 text-accent group-hocus:text-body md:hidden'
      />
    </span>
    <span className='font-serif text-4xl/[0.85] -tracking-widest text-accent-600 md:hidden'>
      HML
    </span>
  </Link>
)

const NavSectionDesktopLinks = ({
  nav,
  openSection,
  currentSection,
  setOpenSection,
}: {
  nav: tNavFetchTopNavItem[]
  openSection: string | null
  currentSection?: string
  setOpenSection: Dispatch<SetStateAction<string | null>>
}) => {
  return (
    <nav
      aria-label='Sections'
      className={cn(
        'flex min-w-0 flex-1 items-stretch max-md:hidden md:ml-6',
        'max-md:order-last max-md:basis-full max-md:overflow-x-auto max-md:border-t max-md:border-hr-muted',
        'max-md:scrollbar-none max-md:[-ms-overflow-style:none]',
        'justify-center max-md:[&::-webkit-scrollbar]:hidden'
      )}>
      {nav.map((grp) => {
        return (
          <SectionHeader
            key={grp.slug}
            href={grp.url}
            hasChildren={grp.links.length > 0}
            state={
              openSection == grp.slug && grp.links.length > 0 ? 'open'
              : currentSection == grp.slug ?
                'current'
              : 'default'
            }
            onOpen={() => setOpenSection(grp.slug)}>
            {grp.displayText}
          </SectionHeader>
        )
      })}
    </nav>
  )
}

export const SiteHeader = ({ topNav: nav }: { topNav: tNavFetchCTX['topNav'] }) => {
  const pathname = usePathname().slice(1)
  const [openSlug, setOpenSlug] = useState<string | null>('6aa940b72fdee125f32420e3')
  const [indexOpen, setIndexOpen] = useState(false)

  useKeyboard({ key: 'Escape', onKeyPress: () => setOpenSlug(null) })
  useEffect(() => {
    setOpenSlug(null)
    setIndexOpen(false)
  }, [pathname])

  const currentSection = nav.find((s) => pathname == s.url || pathname.startsWith(`${s.url}/`))?.url

  const open = nav.find((s) => s.slug == openSlug && s.links.length > 0)

  return (
    <header
      onMouseLeave={() => setOpenSlug(null)}
      className={cn('sticky top-0 z-99 border-b border-hr-muted/10', 'max-md:mb-8 print:static')}>
      <div className='relative z-1 flex flex-wrap items-stretch bg-background/80 px-2 not-print:backdrop-blur-sm md:pr-6'>
        <NavSectionLogo />

        <NavSectionDesktopLinks
          nav={nav}
          openSection={openSlug}
          setOpenSection={setOpenSlug}
          currentSection={currentSection}
        />

        <MobileMenu
          indexOpen={indexOpen}
          setIndexOpen={setIndexOpen}
        />
      </div>

      {open && (
        <SectionPanel
          section={open}
          onClose={() => setOpenSlug(null)}
        />
      )}

      <MobileIndex
        open={indexOpen}
        onClose={() => setIndexOpen(false)}
        sections={nav}
        currentSection={currentSection}
      />
    </header>
  )
}
