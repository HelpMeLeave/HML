import { isCollection } from '@/access/_lib/isCollection'
import type {
  HeaderDD,
  HeaderLink,
  HeaderTab,
  NavLink,
  NotNull,
} from '@/app/(www)/_providers/Navigation/_types'
import { isOffSite } from '@/lib/normalize/isOffSite'
import { resolveLinkNode } from '@/lib/normalize/resolveLink'
import { objHasKey } from '@/lib/objHasKey'
import { getPayload } from '@/server/getPayload'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { DateTime } from 'luxon'
import { isNumber } from 'payload/shared'
import type { NavigationGroup, tNavFetchCTX, tNavFetchTopNavItem } from 'www/_providers/_types'

const createLink = (ea: NavLink): NavigationGroup => ({
  type: ea.item?.relationTo == 'externalResources' ? 'external' : 'internal',
  displayText: ea.displayText,
  url:
    isCollection(ea.item.value) ?
      isOffSite(ea.item.value?.url) ? ea.item.value.url
      : ea.item.value?.url.replace(/^([a-z])/, '/$1')
    : '',
})

const isNotNull = <T>(entry: T): entry is NotNull<T> => String(entry) != 'null'
const getHeaderLink = (entry: HeaderDD | HeaderLink) => {
  const { item } = entry
  if (!item) return
  const { url } =
    objHasKey<{ url: string }>('url', item) ? item
    : objHasKey<{ url: string }>('url', item.value) ? item.value
    : { url: null }
  return url && resolveLinkNode({ url, linkType: 'custom' })
}

const createHeaderNav = (ea: HeaderDD | HeaderTab): tNavFetchTopNavItem => {
  const link = getHeaderLink(ea)
  if (link && link.offsite == false) {
    link.url = link.url.startsWith('/') ? link.url : `/${link.url}`
  }
  const displayText = ea.displayText ?? ''
  const description =
    objHasKey('description', ea) && isNotNull(ea.description) ? ea.description : undefined
  const links =
    (objHasKey<HeaderTab>('links', ea)
      && ea.links?.map((l) => ({
        ...createLink({ ...(l as NavLink), displayText: l.displayText ?? '' }),
        description: l.description ?? undefined,
      })))
    ?? []

  return {
    slug: ea.id ?? '',
    ...link,
    displayText,
    description,
    links: links ? links : [],
  }
}

export const getNavigation = async (): Promise<tNavFetchCTX> => {
  const payload = await getPayload()

  const {
    navigation: {
      header: { tab: header },
      footer: { link: footer },
    },
    announcementBanner,
  } = await payload.findGlobal({
    slug: 'global-settings',
    select: {
      navigation: true,
      announcementBanner: true,
    },
    populate: {
      routes: {
        url: true,
        doc: true,
      },
      content: {
        slug: true,
      },
    },
    depth: 2,
  })

  return {
    footerLinks: footer.map((f) => createLink({ ...f, displayText: f.displayText ?? '' })) ?? [],
    topNav: (header as Array<HeaderDD | HeaderTab>).map(createHeaderNav),
    banner:
      isNumber(announcementBanner) ? undefined : (
        {
          url: resolveLinkNode(announcementBanner).url,
          tagline: announcementBanner.banner as DefaultTypedEditorState,
        }
      ),
    year: DateTime.now().year,
    user: null,
  }
}
