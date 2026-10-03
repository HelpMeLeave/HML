import { SlugComponentClient } from '@/collections/ContentCollections/Content/_fields/Slug/Field.client'
import type { TextFieldServerProps } from 'payload'

const SlugComponent = (props: TextFieldServerProps) => {
  const { operation, permissions } = props
  const canEdit = operation === 'create' || permissions === true || permissions?.update === true
  return <SlugComponentClient canEdit={canEdit} />
}

export default SlugComponent
