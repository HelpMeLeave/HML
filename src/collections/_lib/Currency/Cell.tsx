import CellBase from '@/collections/_lib/CellBase'
import { NA } from '@/collections/_lib/NA'
import { CURRENCIES } from '@/lib/constants/COUNTRY_CURRENCIES'
import type { CountryISO } from '@/payload-types'
import type { DefaultCellComponentProps } from 'payload'

const CurrencyCell = ({
  currency,
  ...props
}: DefaultCellComponentProps & {
  children: ReactNode
  currency: CountryISO
}) => {
  const currencySymbol = CURRENCIES[currency].symbol
  // 0 is a value, not an empty cell
  return props.cellData || props.cellData === 0 ?
      <CellBase {...props}>
        {currencySymbol}
        {Number(props.cellData).toFixed(2)}
      </CellBase>
    : <NA />
}

export default CurrencyCell
