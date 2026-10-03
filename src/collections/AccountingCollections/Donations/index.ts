import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { rowField } from '@/collections/_fields/Flex'
import { CheckboxConfig } from '@/collections/_lib/Checkbox'
import { CurrencyConfig } from '@/collections/_lib/Currency'
import { TextConfig } from '@/collections/_lib/Text'
import type { CollectionConfig } from 'payload'

export const DonationsCollectionConfig: CollectionConfig<'donations'> = {
  slug: 'donations',
  admin: {
    useAsTitle: 'paymentId',
    defaultColumns: ['paymentId', 'donationDate', 'amount'],
  },
  access: {
    read: (args) => is().Location.NotAdmin(args) || is().Role.Director(args),
    update: is().Role.Director,
  },
  defaultPopulate: {
    amount: true,
  },
  labels: {
    singular: tFn('title:donation'),
    plural: tFn('title:donations'),
  },
  timestamps: true,
  fields: [
    rowField(
      {},
      {
        type: 'relationship',
        admin: {
          readOnly: true,
        },
        hasMany: false,
        relationTo: 'supporter',
        name: 'supporter',
      },
      rowField(
        {},
        {
          type: 'date',
          name: 'donationDate',
          label: 'Date',
        },
        CurrencyConfig('amount', 'EUR')
      )
    ),
    // unique is load-bearing, not cosmetic: the webhook's ON CONFLICT (payment_id) DO NOTHING is what makes a Stripe retry a no-op, and it needs this index to exist
    rowField({}, TextConfig('paymentId', { unique: true }), TextConfig('receipt')),
  ],
}

export const SupporterCollectionConfig: CollectionConfig<'supporter'> = {
  slug: 'supporter',
  admin: {
    useAsTitle: 'email',
    groupBy: true,
  },
  defaultPopulate: {
    total: true,
  },
  access: {
    read: (args) => is().Location.NotAdmin(args) || is().Role.Director(args),
    update: is().Role.Director,
  },
  labels: {
    singular: tFn('title:supporter'),
    plural: tFn('title:supporters'),
  },
  timestamps: true,
  fields: [
    rowField({}, TextConfig('firstName'), TextConfig('lastName')),
    // unique lets the webhook upsert on email in one statement rather than find-then-create, and closes the race where two concurrent deliveries both create the same donor
    rowField(
      {},
      TextConfig('stripeId'),
      TextConfig('email', { textType: 'mail', required: true, unique: true })
    ),
    CheckboxConfig('newsletter', {
      defaultValue: false,
    }),
    {
      type: 'join',
      on: 'supporter',
      collection: 'donations',
      hasMany: true,
      name: 'donations',
    },
    // stored rather than virtual, so it sorts and filters in the admin like any other column. Written by the webhook; read-only here because editing it by hand would silently diverge from the donation rows it sums.
    CurrencyConfig('total', 'EUR', {
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    }),
  ],
}
