import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'

import '@/styles/admin/index.css'

import { importMap } from '@/_config/payload-importMap'
import config from '@/_config/payload.config'
import { cn } from '@/lib/cn'
import { atkinsonFont, atkinsonMonoFont, bebasNeue } from '@/lib/fonts'
import type { ServerFunctionClient } from 'payload'
import { type ComponentPropsWithoutRef, Suspense } from 'react'

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <RootLayout
        htmlProps={
          {
            ['data-admin']: '',
            className: cn(
              atkinsonFont.variable,
              atkinsonMonoFont.variable,
              bebasNeue.variable,
              String.raw`has-[.collection-edit--users_.create-user_.countdown]:**:[.doc-controls,.doc-header,.auth-fields.collection-edit\_\_auth,.document-fields\_\_sidebar-wrap]:hidden`
              // 'has-[.collection-edit--users_.create-user_.countdown]:**:[.app-header,#nav-toggler]:z-0'
            ),
          } as ComponentPropsWithoutRef<'html'>
        }
        config={config}
        importMap={importMap}
        serverFunction={serverFunction}>
        {children}
      </RootLayout>
    </Suspense>
  )
}
