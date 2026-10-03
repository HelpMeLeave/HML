'use client'

import IconLogo from '@/_components/AdminLayout/StepNav/Icon'
import { cn } from '@/lib/cn'
import { Link, useStepNav } from '@payloadcms/ui'
import { useRef } from 'react'
import { Fragment } from 'react/jsx-runtime'
/*8-16*/

type StevNavItem = ReturnType<typeof useStepNav>['stepNav'][number]

const Slash = () => <strong>/</strong>

const Item = ({ step: { label, url }, isLast }: { step: StevNavItem; isLast: boolean }) => {
  if (url && !isLast) {
    return (
      <Link
        className='focus-visible:text-accent! focus-visible:underline'
        prefetch={false}
        href={url}>
        {label as string}
      </Link>
    )
  }
  return <span className='block text-nowrap text-ellipsis'>{label as string}</span>
}

const StepNav = () => {
  const { stepNav } = useStepNav()
  const stepRef = useRef<HTMLSpanElement>(null)

  return (
    <header id='stepNav'>
      <span
        ref={stepRef}
        className={cn(
          'flex items-center gap-x-2 px-4 py-2 font-mono text-xs font-[450] tracking-wide uppercase'
        )}>
        <Link
          href={'/admin'}
          prefetch={false}
          className='focus-visible:*:text-theme-foreground focus-visible:outline-offset-2'>
          <IconLogo />
        </Link>
        {stepNav.map((step, i) => (
          <Fragment key={i}>
            <Slash />
            <Item
              step={step}
              isLast={i == stepNav.length - 1}
            />
          </Fragment>
        ))}
      </span>
    </header>
  )
}

export default StepNav
