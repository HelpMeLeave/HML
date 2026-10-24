import { Wrapper } from '@/collections/_lib/IconFieldWrappers'
import { PaperPlane } from '@boxicons-pro/react'
import { TextField } from '@payloadcms/ui'
import type { TextFieldServerProps } from 'payload'

const EmailField = (props: TextFieldServerProps) => {
  return (
    <Wrapper
      label={props.clientField.label}
      IconEl={<PaperPlane />}
      iconPosition='left'
      type={'text'}
      path={props.path}>
      <TextField
        readOnly={props.field.admin?.readOnly}
        field={{
          ...props.clientField,
          label: undefined,
          admin: {
            autoComplete: 'email',
            ...props.clientField.admin,
          },
        }}
        path={props.path}
      />
    </Wrapper>
  )
}

export default EmailField
