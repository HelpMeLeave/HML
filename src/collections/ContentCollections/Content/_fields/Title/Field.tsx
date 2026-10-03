import type { TextFieldServerProps } from 'payload'
import { CreateTitleField, EditTitleField } from './Field.client'

const TitleField = (props: TextFieldServerProps) => {
  const { operation } = props

  const affectsSlug = operation == 'create'

  return affectsSlug ? <CreateTitleField /> : <EditTitleField />
}

export default TitleField
