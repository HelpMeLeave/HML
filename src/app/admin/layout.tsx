import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'

import '@/styles/admin/tailwind.css'

import '@/styles/admin/index.scss'

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
            className: cn(atkinsonFont.variable, atkinsonMonoFont.variable, bebasNeue.variable),
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
