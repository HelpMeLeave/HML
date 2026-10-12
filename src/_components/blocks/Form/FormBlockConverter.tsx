import { FormComponent } from '@/_components/blocks/Form/FormBlockComponent'
import type { BlockConverterProps } from '@/lexicals/_types'
import type { FormBlock } from '@/payload-types'

export const FormBlockConverter = ({ node }: BlockConverterProps<FormBlock>) => {
  const { form } = node.fields
  if (typeof form !== 'object') return null
  return <FormComponent form={form} />
}
