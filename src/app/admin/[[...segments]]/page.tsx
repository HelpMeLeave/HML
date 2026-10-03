/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

import { importMap } from '@/_config/payload-importMap'
import configPromise from '@/_config/payload.config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  return generatePageMetadata({ config: configPromise, params, searchParams })
}

const Page = async ({ ...args }: Args) => {
  return (
    <RootPage
      config={configPromise}
      importMap={importMap}
      params={args.params}
      searchParams={args.searchParams}
    />
  )
}

export default Page
