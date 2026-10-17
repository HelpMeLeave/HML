import type { ContentRecordRoute, HandleProps } from '@/app/(www)/(Content)/[...slug]/_lib/_types'
import { baseQry } from '@/app/(www)/(Content)/[...slug]/_lib/baseQry'
import { checkUsers } from '@/app/(www)/(Content)/[...slug]/_lib/checkUser'
import { hasContent } from '@/app/(www)/(Content)/[...slug]/_lib/hasContent'
import { mergeObj } from '@/lib/mergeObj'
import type { RoutesSelect } from '@/payload-types'
import { getPayload } from '@/server/getPayload'
import type { PaginatedDocs, Where as PayloadWhere } from 'payload'

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
        currentLifecycle: { changed: { at: true } },
      },
    },
  })

  return { totalDocs, doc: docs[0]?.doc, user, payload }
}

const handlePublic = async ({ user, url, payload }: HandleProps) => {
  const base = baseQry(url)

  const { docs, totalDocs } = (await payload.find<
    'routes',
    RoutesSelect<true> | RoutesSelect<false>
  >({
    ...base,
    depth: 3,
    where: mergeObj(base.where ?? {}, {
      'doc.currentLifecycle.published': { exists: true },
    }) as PayloadWhere,
    select: mergeObj(base.select ?? {}, {
      'doc.currentLifecycle': true,
    }),
    populate: mergeObj(base.populate ?? {}, {
      tag: {
        display: true,
        title: true,
      },
      content: {
        contentType: true,
        currentLifecycle: { published: true },
      },
      'content-record': {
        transition: true,
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
    }),
  })) as PaginatedDocs<ContentRecordRoute>

  return {
    user,
    payload,
    totalDocs,
    doc: {
      ...docs?.[0]?.doc.currentLifecycle.published.snapshot,
      id: docs?.[0]?.doc.id,
      flow: 'published',
      updated: docs?.[0]?.doc.currentLifecycle.published.transition?.at,
      init: docs?.[0]?.doc.init,
    },
  }
}

export const query = async ({ url, preview }: { url: string; preview: boolean }) => {
  const payload = await getPayload()
  if (!payload) return { doc: {}, payload: {} }

  const fn = preview ? handlePreview : handlePublic

  const { user, doc, totalDocs } = await fn({ user: null, url, payload })

  return {
    user,
    payload,
    doc: hasContent(totalDocs ?? 0, doc) ? doc : {},
  }
}
