import { FieldLabel } from '@/_components/blocks/Form/_components/Field'
import type { Form, FormSubmission } from '@/payload-types'
import Image from 'next/image'

const StaticField = ({
  label,
  name,
  children,
}: {
  label: string
  name: string
  width: number
  required: boolean
  children: React.ReactNode
}) => (
  <>
    <FieldLabel
      name={name}
      className='justify-end dark:font-normal dark:text-accent'>
      {label}:
    </FieldLabel>
    <span className='text-sm'>{children}</span>
  </>
)

const renderValue = (
  blockType: NonNullable<Form['fields']>[number]['blockType'],
  value: string
) => {
  switch (blockType) {
    case 'formFieldCheckbox':
      return <span>{value === 'true' ? '✓ Yes' : '✗ No'}</span>
    case 'formFieldSignature':
      return value ?
          <Image
            src={value}
            alt='Signature'
            className='max-h-32 max-w-full'
          />
        : <span className='text-slate-500 italic'>No signature provided</span>
    default:
      return <span>{value || <span className='text-slate-500 italic'>—</span>}</span>
  }
}

export const SubmissionContent = ({ submission }: { submission: FormSubmission }) => {
  const form = submission.form as Form
  if (!form?.fields?.length) return null

  const valueMap = Object.fromEntries(
    (submission.submissionData ?? []).map(({ field, value }) => [field, value])
  )

  return (
    <div className='grid! max-w-3xl grid-cols-[max-content_auto] flex-wrap items-center gap-x-2 py-4'>
      {form.fields
        .filter((x) => x.blockType != 'formFieldMessage')
        ?.map((formField) => {
          if (!('name' in formField)) return null

          const { name, id: fieldId } = formField
          const label = 'label' in formField && formField.label ? formField.label : name
          const required = ('required' in formField && formField.required) ?? false
          const width = 'width' in formField && formField.width ? formField.width : 100

          return (
            <StaticField
              key={fieldId ?? name}
              label={label}
              name={name}
              required={required}
              width={width}>
              {renderValue(formField.blockType, valueMap[name] ?? '')}
            </StaticField>
          )
        })}
    </div>
  )
}
