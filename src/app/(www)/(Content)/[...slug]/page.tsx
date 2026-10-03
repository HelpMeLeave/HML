import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import { removeParagraph } from '@/_components/lexicals/RenderRichText/removeParagraphs'
import { query } from '@/app/(www)/(Content)/[...slug]/_lib/query'
import type { MainDetails } from '@/components/Structure/_types'
import {
  Main,
  MainEyebrow,
  MainHeading,
  MainHGroup,
  MainSubtitle,
} from '@/components/Structure/Main'
import { env } from '@/env'
import { lastArrayIndex } from '@/lib/array'
import type { Where } from '@/lib/filterBy'
import { getPreview } from '@/lib/getPreview'
import type { Content, ContentSnapshot, User } from '@/payload-types'
import { getPayload } from '@/server/getPayload'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import type { Metadata } from 'next'
import { type BasePayload } from 'payload'
import { Fragment, Suspense } from 'react'
import { NotFound } from 'www/_components/NotFound'
import { TOC } from 'www/_components/Outline'
import { Skeleton } from 'www/_components/Skeleton'
import RefreshRouteOnSave from './page.client'
import { pageConverters } from './pageConverters'

export default async function Page({ params, searchParams }: PageProps<'/[...slug]'>) {
  return (
    <Fragment>
      <Suspense fallback={<Skeleton />}>
        <PageData
          params={params}
          searchParams={searchParams}
        />
      </Suspense>
    </Fragment>
  )
}

export const generateMetadata = async ({ params }: PageProps<'/[...slug]'>): Promise<Metadata> => {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug.join('/'))

  const { doc } = await query({
    url: decodedSlug,
    preview: false,
  })

  if (doc) {
    const { title, content, subtitle } = doc as ContentSnapshot

    return {
      title,
      description: getPreview([subtitle, content]),
      referrer: 'origin-when-cross-origin',
    }
  }

  return {
    title: 'Not Found',
  }
}

export const generateStaticParams = async () => {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'routes',
    where: {
      'doc.currentLifecycle.published': { exists: true },
    } as Where<'routes'>,
    select: {
      url: true,
    },
    pagination: false,
  })
  const params = docs.map((doc) => ({ slug: doc.url.split('/') }))
  return params
}

const PageData = async ({
  params,
  searchParams,
}: Pick<PageProps<'/[...slug]'>, 'params' | 'searchParams'>) => {
  const { slug } = await params
  const { preview } = await searchParams
  const decodedSlug = decodeURIComponent(slug.join('/'))

  const { user, doc, payload } = (await query({
    url: decodedSlug,
    preview: preview != undefined,
  })) as { user: User | false; doc: Content; payload: BasePayload }

  if (!doc || !payload) {
    return <NotFound />
  }

  const { id, title, content, subtitle, flow } = doc as Partial<Content>

  const docPreview = convertLexicalToPlaintext({
    converters: {
      'section-hgroup': ({ nodesToPlaintext, node }) => {
        return nodesToPlaintext({
          nodes: (node.children as SerializedLexicalNode[])?.filter(
            (ea) => ea.type != 'section-eyebrow'
          ),
        }) as unknown as string
      },
    },
    data: {
      ...(content ?? {
        root: {
          children: [],
          type: '',
          direction: 'ltr',
          version: 1,
          format: 'start',
          indent: 0,
        },
      }),
    },
  }).slice(0, 250)
  const fullUrl = `${env.NEXT_PUBLIC_BASE_URL}/${decodedSlug}`

  return (
    <Fragment>
      {preview != undefined && <RefreshRouteOnSave />}
      {content && (
        <TOC
          content={content}
          title={title ?? ''}
          url={fullUrl}
          docPreview={docPreview}
        />
      )}
      <Main
        data-hasAdminBar={user ?? undefined}
        data-layout='constrained'
        data-page={decodedSlug}
        adminData={{
          slug: slug[lastArrayIndex(slug)],
          user,
          id,
          flow,
        }}>
        <MainHGroup>
          <MainEyebrow pageDetails={doc as MainDetails} />
          <MainHeading>{title}</MainHeading>
          {subtitle && (
            <MainSubtitle>
              <RichTextComponent
                blockType='rich-text'
                converterOverrides={{ paragraph: removeParagraph }}
                content={subtitle}
              />
            </MainSubtitle>
          )}
        </MainHGroup>
        {content && (
          <RichTextComponent
            blockType='rich-text'
            content={content as DefaultTypedEditorState}
            converterOverrides={pageConverters}
          />
        )}
      </Main>
    </Fragment>
  )
}
