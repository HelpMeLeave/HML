import { FlagLabelClient } from '@/collections/_labels/FlagLabel/index.client'
import type { StaticLabel } from 'payload'

const FlagLabel = ({
  field,
  children,
  collectionSlug,
}: {
  collectionSlug: string
  field: {
    required?: boolean
    label?: StaticLabel | boolean | undefined
    name: string
  }
  children?: ReactNode
}) => {
  return (
    <FlagLabelClient
      collectionSlug={collectionSlug}
      label={field.label}
      required={field.required}
      name={field.name}>
      {children}
    </FlagLabelClient>
  )
}

export default FlagLabel
