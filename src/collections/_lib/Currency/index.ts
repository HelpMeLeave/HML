import type { CurrencyProps, ValidCurrencyField } from '@/collections/_lib/Currency/_types'
import type { CountryISO } from '@/payload-types'

const CurrencyFieldPath = '@/collections/_lib/Currency/Field'
const CurrencyCellPath = '@/collections/_lib/Currency/Cell'

export const CurrencyConfig = (
  name: string,
  currency: CountryISO,
  options?: CurrencyProps
): ValidCurrencyField =>
  ({
    ...options,
    type: 'number',
    name,
    admin: {
      ...options?.admin,
      components: {
        ...options?.admin?.components,
        Field: options?.admin?.components?.Field ?? {
          path: CurrencyFieldPath,
          serverProps: {
            currency,
          },
        },
        Cell: options?.admin?.components?.Cell ?? {
          path: CurrencyCellPath,
          serverProps: {
            currency,
          },
        },
      },
    },
  }) as ValidCurrencyField
