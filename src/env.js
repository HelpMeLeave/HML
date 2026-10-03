import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    ADMIN_PATH: z.string().default('/admin'),

    POSTGRES_URL: z.string(),

    PAYLOAD_SECRET: z.string(),

    R2_ACCT: z.string(),
    R2_TOKEN: z.string(),
    R2_ACCESS_KEY_ID: z.string(),
    R2_SECRET_KEY: z.string(),

    UPLOADTHING_TOKEN: z.string(),
    UPLOADTHING_APP: z.string(),

    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_PRODUCT_ONCE: z.string(),
    STRIPE_PRODUCT_MONTHLY: z.string(),
    STRIPE_PRODUCT_FEE: z.string(),

    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_BASE_URL: z.string(),
    NEXT_PUBLIC_R2_URL: z.string(),
    NEXT_PUBLIC_R2_BUCKET: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_R2_URL: process.env.NEXT_PUBLIC_R2_URL,
    NEXT_PUBLIC_R2_BUCKET: process.env.NEXT_PUBLIC_R2_BUCKET,

    ADMIN_PATH: process.env.ADMIN_PATH,

    POSTGRES_URL: process.env.POSTGRES_URL,

    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,

    R2_ACCT: process.env.R2_ACCT,
    R2_TOKEN: process.env.R2_TOKEN,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_KEY: process.env.R2_SECRET_KEY,

    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    UPLOADTHING_APP: process.env.UPLOADTHING_APP,

    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRODUCT_ONCE: process.env.STRIPE_PRODUCT_ONCE,
    STRIPE_PRODUCT_MONTHLY: process.env.STRIPE_PRODUCT_MONTHLY,
    STRIPE_PRODUCT_FEE: process.env.STRIPE_PRODUCT_FEE,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
