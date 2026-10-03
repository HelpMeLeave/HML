'use client'

import { InlineLink } from '@/components/primitives/Link'
import { Eyebrow } from '@/components/Structure/Eyebrow'
import { lastArrayIndex } from '@/lib/array'
import { cn } from '@/lib/cn'
import { ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useContext, useEffect } from 'react'
import type { tAdminBarCTX } from 'www/_providers/_types'
import { AdminBarCTX } from 'www/_providers/CTX'

const Divider = () => <ChevronRight className='mx-2 inline h-3.5 w-3.5 text-accent-muted' />

const BreadcrumbLink = ({
  baseLink,
  path,
  index,
  ...props
}: Omit<Props<typeof InlineLink>, 'href'> & {
  index: number
  baseLink?: string
  path?: string[]
  href?: string
}) => {
  return (
    <InlineLink
      {...props}
      prefetch={false}
      href={path ? [baseLink, ...path.slice(1, index + 1)].join('/') : (props.href as string)}
      key={index}
      className={cn(props.className)}
    />
  )
}

export const MainBreadcrumb = ({ baseLink, ...props }: Props<'nav'> & { baseLink?: string }) => {
  const path = usePathname().split('/').filter(Boolean)

  return (
    <Eyebrow className='items-center-safe pb-1'>
      <BreadcrumbLink
        className='tracking-[2px]! text-inherit'
        index={0}
        href='/'>
        Home
      </BreadcrumbLink>
      <Divider />
      {path.map((segment, index) => {
        const isLast = index == lastArrayIndex(path)
        if (!isLast) {
          const segmentName = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase())

          if (baseLink) {
            return (
              <BreadcrumbLink
                key={path[index]}
                path={path}
                index={index}
                href={undefined}>
                {segmentName}
                {!isLast && <Divider />}
              </BreadcrumbLink>
            )
          }

          return (
            <span
              key={index}
              className={cn(isLast && 'text-muted', props.className)}>
              {segmentName}
              {!isLast && <ChevronRight className='mx-2 inline h-4 w-4 text-accent' />}
            </span>
          )
        }
      })}
    </Eyebrow>
  )
}

export const MainClient = ({ mainData }: { mainData?: tAdminBarCTX['data'] }) => {
  const { data, setData } = useContext(AdminBarCTX)!

  const ctxSlug = mainData?.slug

  useEffect(() => {
    if (mainData && setData && data?.slug != ctxSlug) {
      setData({ ...mainData })
    }
  }, [ctxSlug])

  return <></>
}
