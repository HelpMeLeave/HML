import { CURRENCIES } from '@/lib/constants/COUNTRY_CURRENCIES'
import type { CountryISO } from '@/payload-types'

export const COUNTRY_ISO3: CountryISO[] = Object.keys(CURRENCIES) as CountryISO[]
