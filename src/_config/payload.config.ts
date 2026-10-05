import { baseFeatures, baseTheme } from '@/_components/lexicals/options'
import { viewPath } from '@/_components/views'
import { SidebarTogglePath } from '@/_components/views/SidebarToggle'
import {
  ColumnsBlockConfig,
  CTABlockConfig,
  DynamicTextInlineBlockConfig,
  RichTextConfig,
  VideoPlayerBlockConfig,
} from '@/_config/Blocks'
import { folders } from '@/_config/folders'
import { i18n } from '@/_config/i18n'
import { plugins } from '@/_config/plugins'
import { Schema } from '@/_config/schema'
import { collections } from '@/collections'
import { globals } from '@/globals'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { type PgSchema, pgEnum } from '@payloadcms/db-postgres/drizzle/pg-core'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { cwd } from 'node:process'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { defaultTimezones } from 'payload/shared'
import process from 'process'
import sharp from 'sharp'

const config = buildConfig({
  debug: true,
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  collections,
  globals,
  custom: {
    walked: false,
    sidebarCollections: [],
  },
  i18n,
  folders,
  editor: lexicalEditor({
    features: baseFeatures().all(),
    lexical: {
      theme: baseTheme,
      namespace: 'root',
    },
  }),
  // #region ! ---------- ADMIN ----------
  admin: {
    autoRefresh: true,
    suppressHydrationWarning: true,
    user: 'users',
    theme: 'all',
    dateFormat: 'MMM do, y',
    timezones: {
      supportedTimezones: defaultTimezones,
    },
    avatar: 'gravatar',

    // #region ! ---------- IMPORT MAP ----------
    importMap: {
      importMapFile: path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        './payload-importMap.ts'
      ),
      autoGenerate: true,
    },
    // #endregion ! --------------------

    // #region ! ---------- META ----------
    meta: {
      creator: 'Help Me Leave Team',
      titleSuffix: '| HML',
      description: 'HML CMS',
      icons: [
        {
          rel: 'icon',
          url: '/favicon.ico',
        },
      ],
      openGraph: {
        description: 'Help Me Leave CMS',
        siteName: 'Help Me Leave',
        title: 'Help Me Leave CMS',
      },
    },
    // #endregion ! --------------------

    // #region ! ---------- LIVE PREVIEW ----------
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
      ],
    },
    // #endregion ! --------------------

    // #region ! ---------- COMPONENTS ----------
    components: {
      graphics: {
        Logo: {
          path: viewPath('Logo'),
        },
        Icon: viewPath('Icon'),
      },
      header: [SidebarTogglePath],
    },
    // #endregion ! --------------------
  },
  // #endregion ! --------------------

  // #region ! ---------- ENDPOINTS ----------
  endpoints: [
    {
      path: '/register/:username/:token',
      method: 'get',
      handler: async (req) => {
        type GetUserFromTokenInput = { token?: string; username?: string }
        const { token, username } = req.routeParams as GetUserFromTokenInput
        if (!token || !username) return Response.json({ error: 'invalid' }, { status: 404 })

        const { docs, totalDocs } = await req.payload.find({
          collection: 'users',
          where: {
            resetPasswordToken: {
              equals: token.toLowerCase(),
            },
            username: {
              equals: username.toLowerCase(),
            },
          },
          select: {
            key: false,
            sessions: false,
            documents: false,
            roles: false,
            createdAt: false,
            updatedAt: false,
            pathways: false,
            password: false,
            'confirm-password': false,
          },
          pagination: false,
          limit: 1,
          req,
        })

        if (totalDocs > 0) {
          const { agreement } = await req.payload.findGlobal({
            slug: 'volunteer-agreement',
            select: {
              agreement: true,
            },
            req,
          })

          if (agreement) {
            return Response.json(
              {
                body: {
                  user: docs[0],
                  agreement,
                },
              },
              { status: 400 }
            )
          }
        }

        return Response.json({ error: 'Invalid entry' }, { status: 404 })
      },
    },
  ],
  // #endregion ! --------------------

  // #region ! ---------- TS ----------
  typescript: {
    outputFile: path.resolve(process.cwd(), '@types', 'payload-types.ts'),
    autoGenerate: true,
    schema: Schema,
  },
  // #endregion ! --------------------

  // #region ! ---------- DATABASE ----------
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
      max: 5,
    },
    blocksAsJSON: true,
    idType: 'serial',
    afterSchemaInit: [
      ({ schema }) => {
        return {
          ...schema,
          enums: {
            ...schema.enums,
            enum_pathways_notes_type: pgEnum('enum_pathways_notes_type', [
              'general',
              'restriction',
              'citizenship',
              'residency',
              'reunification',
            ]) as PgSchema['enum'][keyof PgSchema['enum']],
          },
        }
      },
    ],
    generateSchemaOutputFile: path.resolve(cwd(), './src/_config/payload-generated-schema.ts'),
  }),
  // #endregion ! --------------------

  // #region ! ---------- EMAIL ----------
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY ?? '',
    defaultFromName: 'Help Me Leave Team',
    defaultFromAddress: 'team@contact.helpmeleave.us',
  }),
  // #endregion ! --------------------

  // #region ! ---------- BLOCKS ----------
  blocks: [
    RichTextConfig,
    VideoPlayerBlockConfig,
    CTABlockConfig,
    ColumnsBlockConfig,
    DynamicTextInlineBlockConfig,
  ],
  // #endregion ! --------------------

  // #region ! ---------- PLUGINS ----------
  plugins,
  // #endregion ! --------------------
})

export default config
