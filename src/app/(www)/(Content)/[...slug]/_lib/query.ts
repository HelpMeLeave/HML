import type { ContentRecordRoute, HandleProps } from '@/app/(www)/(Content)/[...slug]/_lib/_types'
import { baseQry } from '@/app/(www)/(Content)/[...slug]/_lib/baseQry'
import { checkUsers } from '@/app/(www)/(Content)/[...slug]/_lib/checkUser'
import { hasContent } from '@/app/(www)/(Content)/[...slug]/_lib/hasContent'
import type { RoutesSelect } from '@/payload-types'
import { getPayload } from '@/server/getPayload'
import type { PaginatedDocs } from 'payload'

const handlePreview = async ({ user, url, payload }: HandleProps) => {
  user = user ?? (await checkUsers(payload))

  if (!user) {
    return { user, doc: {}, payload: {} }
  }

  const { docs, totalDocs } = await payload.find<
    'routes',
    RoutesSelect<true> | RoutesSelect<false>
  >({
    ...baseQry(url),
    depth: 2,
    populate: {
      content: {
        content: true,
        title: true,
        subtitle: true,
        'other-brow': true,
        flow: true,
      },
    },
  })

  return {
    totalDocs,
    doc: docs[0]?.doc,
    user,
    payload,
  }
}

const handlePublic = async ({ user, url, payload }: HandleProps) => {
  const base = baseQry(url)

  const { docs, totalDocs } = (await payload.find<
    'routes',
    RoutesSelect<true> | RoutesSelect<false>
  >({
    ...base,
    depth: 3,
    where: {
      ...base.where,
      'doc.currentLifecycle.published': { exists: true },
    },
    select: {
      ...base.select,
      'doc.currentLifecycle': true,
    } as RoutesSelect<true>,
    populate: {
      tag: {
        display: true,
        // page-group filters pick their query by the filter tag's title (topic, contentType, …); without it every dynamic filter was skipped
        title: true,
      },
      content: {
        contentType: true,
        currentLifecycle: {
          published: true,
        },
      },
      'content-record': {
        transition: {
          at: true,
        },
        snapshot: {
          content: true,
          title: true,
          subtitle: true,
          'other-brow': true,
          topic: true,
          type: true,
          country: true,
          campaign: true,
        },
      },
    },
  })) as PaginatedDocs<ContentRecordRoute>

  return {
    user,
    payload,
    totalDocs,
    doc: {
      ...docs?.[0]?.doc.currentLifecycle.published.snapshot,
      id: docs?.[0]?.doc.id,
      flow: 'published',
    },
  }
}

export const query = async ({ url, preview }: { url: string; preview: boolean }) => {
  const payload = await getPayload()
  if (!payload) return { doc: {}, payload: {} }

  const { user, doc, totalDocs } = await (preview ?
    handlePreview({ user: null, url, payload })
  : handlePublic({ user: null, url, payload }))

  return {
    user,
    payload,
    doc: hasContent(totalDocs ?? 0, doc) ? doc : {},
  }
}
