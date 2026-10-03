import { Loading } from '@/components/Loading'
import { cn } from '@/lib/cn'
import type { Content } from '@/payload-types'
import { Link } from '@payloadcms/ui'
import type { BasePayload, PayloadRequest } from 'payload'
import { slugify } from 'payload/shared'
import { Suspense } from 'react'

export const getPublishedPathwaysCount = async (payload: BasePayload, req?: PayloadRequest) =>
  (
    await payload.count({
      collection: 'pathways',
      where: {
        'currentLifecycle.published': { exists: true },
      },
      req,
    })
  ).totalDocs

export const getDraftPathwaysCount = async (payload: BasePayload, req?: PayloadRequest) =>
  (
    await payload.count({
      collection: 'pathways',
      where: {
        flow: { equals: 'wip' },
      },
      req,
    })
  ).totalDocs

export const getCountriesWithVisasCount = async (payload: BasePayload, req?: PayloadRequest) =>
  (
    await payload.findDistinct({
      collection: 'pathways',
      field: 'country',
      limit: 0,
      req,
    })
  ).totalDocs

export const getPublishedContentCount = async ({
  payload,
  type,
  req,
}: {
  payload: BasePayload
  type?: Content['contentType'][]
  req?: PayloadRequest
}) => {
  const where = {
    'currentLifecycle.published': { exists: true },
  }
  if (type && type.length > 0) {
    Object.assign(where, {
      contentType: { in: type },
    })
  }

  const qry = await payload.count({
    collection: 'content',
    where,
    req,
  })
  return qry.totalDocs
}

export const getApplicationCount = async (payload: BasePayload, req?: PayloadRequest) =>
  (await payload.count({ collection: 'user-applications', req })).totalDocs

export const getInviteCount = async (payload: BasePayload, req?: PayloadRequest) =>
  (await payload.count({ collection: 'user-invitations', req })).totalDocs

const StatWrapper = ({ link, ...props }: { link?: string } & Props) => {
  if (link)
    return (
      <Link
        {...(props as Props<typeof Link>)}
        prefetch={false}
        className={cn(props.className, 'field-box cursor-pointer')}
        href={link}
      />
    )
  return <div {...props} />
}

const Stat = (stat: {
  name: string
  value: string | number
  unit?: string
  link?: string
  formatValue?: (value: number | string) => string
}) => {
  const value = stat.formatValue ? stat.formatValue(stat.value) : stat.value

  return (
    <Suspense fallback={<Loading />}>
      <StatWrapper
        link={stat.link}
        className='shrink grow rounded-2xl bg-card/75 px-8 py-4 sm:px-8'>
        <p className='text-sm/6 font-medium text-slate-800'>{stat.name}</p>
        <p className='mt-2 flex items-start gap-x-2'>
          <span className='text-4xl font-semibold tracking-tight text-accent'>{value}</span>
          {stat.unit ?
            <span className='max-w-min pt-1.5 font-mono text-xs leading-none font-[450] text-balance text-accent/50 uppercase italic'>
              {stat.unit}
            </span>
          : null}
        </p>
      </StatWrapper>
    </Suspense>
  )
}

export type StatItem = {
  name: string
  formatValue?: (value: number | string) => string
  unit?: string
  value: string | number
  link?: string
}

export const StatsGroup = ({ stats }: { stats: StatItem[] }) => {
  return (
    <section className='flex basis-full flex-wrap gap-2'>
      {stats.map((ea) => {
        return (
          <Stat
            formatValue={ea.formatValue}
            key={[slugify(ea.name), slugify(ea.unit)].join('-')}
            name={ea.name}
            value={ea.value}
            unit={ea.unit}
            link={ea.link}
          />
        )
      })}
    </section>
  )
}
