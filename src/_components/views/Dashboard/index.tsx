import {
  getPublishedContentCount,
  getPublishedPathwaysCount,
  StatsGroup,
  type StatItem,
} from '@/_components/views/Base/Stats'
import { AdminSection } from '@/_components/views/Dashboard/AdminSection'
import { SubmittedContent } from '@/_components/views/Dashboard/SubmittedContent'
import type { Content } from '@/payload-types'
import type { DashboardViewServerProps } from '@payloadcms/next/views'
import { Gutter } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import type { PaginatedDocs } from 'payload'

export type SubmittedContentRes = Omit<Content, 'route'> & {
  route: { docs: { id: number; url: string }[] }
}

const DashboardView = async ({ initPageResult: { req }, user }: DashboardViewServerProps) => {
  if (!user) {
    redirect('/admin/login')
  }
  const [pathwaysCount, contentCount, submittedContent] = await Promise.all([
    getPublishedPathwaysCount(req.payload, req),
    getPublishedContentCount({ payload: req.payload, req }),
    req.payload.find({
      collection: 'content',
      where: { workflowStatus: { equals: 'submitted' } },
      limit: 10,
      req,
      populate: {
        routes: {
          url: true,
        },
      },
    }) as Promise<PaginatedDocs<SubmittedContentRes>>,
  ])

  const stats: StatItem[] = [
    {
      name: 'Visa Pathways',
      unit: 'published',
      formatValue: (value) => String(value).padStart(2, '0'),
      value: contentCount,
    },
    {
      name: 'Pages',
      formatValue: (val) => String(val).padStart(2, '0'),
      unit: 'published',
      value: pathwaysCount,
    },
    {
      name: 'Support Cases',
      value: 345,
      unit: 'closed',
    },
  ]

  return (
    <Gutter className='dashboard'>
      <div className='dashboard__title mb-4'>
        <h1>Dashboard</h1>
      </div>
      <section className='mx-auto flex flex-col gap-y-12 lg:max-w-4xl'>
        <AdminSection isDirector={user.isDirector} />
        <StatsGroup stats={stats} />
        <SubmittedContent submittedContent={submittedContent.docs} />
      </section>
    </Gutter>
  )
}

export default DashboardView
