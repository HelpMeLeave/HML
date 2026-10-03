import { is } from '@/access/is'
import type { GlobalConfig } from 'payload'

const LedgerGlobalConfig: GlobalConfig<'ledger'> = {
  slug: 'ledger',
  fields: [],
  access: {
    read: is().Bri,
  },
  admin: {},
}

export default LedgerGlobalConfig
