import { Wrapper } from '@/collections/_lib/IconFieldWrappers'
import { CURRENCIES } from '@/lib/constants/COUNTRY_CURRENCIES'
import type { CountryISO } from '@/payload-types'
import { NumberField } from '@payloadcms/ui'
import type { NumberFieldClient, NumberFieldServerProps } from 'payload'

const CurrencySymbol = ({ currency }: { currency: CountryISO }) => (
  <span
    className='field-icon'
    style={{
      position: 'absolute',
      bottom: 'calc(50% - 1px)',
      transform: 'translateY(50%)',
    }}>
    {CURRENCIES[currency].symbol}
  </span>
)

const CurrencyField = ({
  ...props
}: NumberFieldServerProps & {
  currency: CountryISO
}) => (
  <Wrapper
    type={props.field.type}
    path={props.path}
    label={props.clientField.label}
    iconPosition='left'
    IconEl={<CurrencySymbol currency={props.currency} />}>
    <NumberField
      readOnly={props.clientField.admin?.readOnly}
      path={props.path}
      field={
        {
          ...props.clientField,
          label: undefined,
          admin: {
            ...props.clientField.admin,
            className: 'number--icon',
            step: 0.01,
          },
        } as NumberFieldClient
      }
    />
  </Wrapper>
)

export default CurrencyField
