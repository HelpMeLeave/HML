import { Wrapper } from '@/collections/_lib/IconFieldWrappers'
import { TextField } from '@payloadcms/ui'
import { Globe } from 'lucide-react'
import type { TextFieldClient, TextFieldServerProps } from 'payload'

const LinkField = ({ ...props }: TextFieldServerProps) => (
  <Wrapper
    className={props.field.admin?.className}
    style={props.field.admin?.style}
    type={props.field.type}
    path={props.path}
    label={props.clientField.label}
    iconPosition='left'
    IconEl={<Globe />}>
    <TextField
      readOnly={props.clientField.admin?.readOnly}
      path={props.path}
      field={
        {
          ...props.clientField,
          label: undefined,
          admin: {
            ...props.clientField.admin,
            className: ['text--icon', props.clientField.admin?.className].filter(Boolean).join(' '),
          },
        } as TextFieldClient
      }
    />
  </Wrapper>
)

export default LinkField
