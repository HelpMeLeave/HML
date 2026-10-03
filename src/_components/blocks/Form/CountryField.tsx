import { CountrySelect } from '@/_components/blocks/Form/CountryField.client'
import type { FormFieldCountry } from '@/payload-types'
import { getPayload } from '@/server/getPayload'

export const CountryFieldComponent = async (props: FormFieldCountry) => {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'countries',
    select: { name: true },
    pagination: false,
    overrideAccess: true,
  })

  return (
    <CountrySelect
      {...props}
      countries={docs}
    />
  )
}
