import type { StripeMetaData } from '@/app/(api)/stripe/_types/SessionData'
import type { IdOfProps } from '@/app/(api)/stripe/webhook/_types'
import { sql } from '@payloadcms/db-postgres/drizzle'
import type { BasePayload } from 'payload'
import type Stripe from 'stripe'

const idOf = (v: IdOfProps) => (typeof v == 'string' ? v : (v?.id ?? null))

type RecordedDonation = {
  donation_id: number
  supporter_id: number
  total: string | number
}

export const recordDonation = async ({
  payload,
  session,
  paymentId,
  receipt,
  amount,
}: {
  payload: BasePayload
  session: Stripe.Checkout.Session
  paymentId: string
  receipt: string | null
  amount: number | null
}): Promise<RecordedDonation | undefined> => {
  const email = session.customer_details?.email ?? session.metadata?.email
  if (!email) throw new Error(`Session ${session.id} carries no email`)

  const meta = session.metadata as StripeMetaData | null
  const donationDate = new Date(session.created * 1000).toISOString()
  const stripeId = idOf(session.customer as string | Stripe.Customer | null)

  const result = await payload.db.drizzle.execute(sql`
    WITH ins AS (
      INSERT INTO supporter (email, first_name, last_name, newsletter, stripe_id, total, updated_at, created_at)
      VALUES (
        ${email},
        ${meta?.firstName ?? null},
        ${meta?.lastName ?? null},
        ${Number(meta?.newsletter ?? 0) == 1},
        CAST(${stripeId} AS varchar),
        -- cast is required, not stylistic: a bind parameter inside COALESCE($n, 0) has no type of its own, so postgres infers it from the literal 0 and types it integer. A whole-euro amount parsed fine, 7.54 did not.
        COALESCE(CAST(${amount} AS numeric), 0),
        now(),
        now()
      )
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    ),
    s AS (
      SELECT id FROM ins
      UNION ALL
      SELECT id FROM supporter WHERE email = ${email} AND NOT EXISTS (SELECT 1 FROM ins)
    ),
    d AS (
      INSERT INTO donations (supporter_id, payment_id, receipt, donation_date, amount, updated_at, created_at)
      SELECT s.id, ${paymentId}, ${receipt}, ${donationDate}::timestamptz, CAST(${amount} AS numeric), now(), now()
      FROM s
      ON CONFLICT (payment_id) DO NOTHING
      RETURNING id, supporter_id, amount
    ),
    bump AS (
      UPDATE supporter
      SET total = COALESCE(supporter.total, 0) + d.amount,
          stripe_id = COALESCE(supporter.stripe_id, CAST(${stripeId} AS varchar)),
          updated_at = now()
      FROM d
      WHERE supporter.id = d.supporter_id
      RETURNING supporter.id, supporter.total
    )
    SELECT d.id AS donation_id, d.supporter_id, COALESCE(bump.total, d.amount) AS total
    FROM d
    LEFT JOIN bump ON bump.id = d.supporter_id
  `)

  return (result.rows as RecordedDonation[])[0]
}
