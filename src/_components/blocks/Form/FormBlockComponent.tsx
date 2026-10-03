import { FormEl } from '@/_components/blocks/Form/_FormComponent/Form'
import { renderField } from '@/_components/blocks/Form/renderField'
import type { Form } from '@/payload-types'

export const FormComponent = async ({ form }: { form: Form }) => {
  return <FormEl {...form}>{form.fields?.map((field) => renderField(field, form.id))}</FormEl>
}
