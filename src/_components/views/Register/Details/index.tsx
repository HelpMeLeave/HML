import { Fieldset } from '@/_components/views/Register/_components/Fieldset'
import { Row } from '@/_components/views/Register/_components/Row'
import type { DispatchFn, FormEntry } from '@/_components/views/Register/_types'
import { PronounsBase } from '@/collections/UserCollections/Users/_components/field.Pronouns'
import { TextField } from '@/components/Form/TextField'
import type { FocusEvent } from 'react'

export const Details = ({
  firstName,
  lastName,
  name,
  pronouns,
  discordHandle,
  errors,
  dispatch,
}: Pick<FormEntry['data'], 'firstName' | 'lastName' | 'pronouns' | 'discordHandle' | 'name'> & {
  dispatch: DispatchFn
  errors: FormEntry['errors']
}) => {
  return (
    <Fieldset label='Details'>
      <Row>
        <TextField
          Label='First Name'
          id='first-name'
          autoComplete='given-name webauthn'
          defaultValue={firstName}
          onBlur={(e: FocusEvent<HTMLInputElement>) =>
            dispatch({
              field: 'firstName',
              value: e.currentTarget.value,
            })
          }
          error={errors?.['firstName']?.errors}
        />
        <TextField
          Label='Last Name'
          id='last-name'
          autoComplete='family-name webauthn'
          defaultValue={lastName}
          onBlur={(e: FocusEvent<HTMLInputElement>) =>
            dispatch({
              field: 'lastName',
              value: e.currentTarget.value,
            })
          }
          error={errors?.['lastName']?.errors}
        />
      </Row>
      <TextField
        Label='Preferred Name'
        id='preferred-name'
        autoComplete='name webauthn'
        defaultValue={name}
        onBlur={(e: FocusEvent<HTMLInputElement>) =>
          dispatch({
            field: 'name',
            value: e.currentTarget.value,
          })
        }
        error={errors?.['name']?.errors}
      />
      <PronounsBase
        path={'pronouns'}
        name={'pronouns'}
        initValue={pronouns}
      />
      <TextField
        Label={'Discord Handle'}
        defaultValue={discordHandle}
        id='discord-handle'
        onBlur={(e: FocusEvent<HTMLInputElement>) =>
          dispatch({
            field: 'discordHandle',
            value: e.currentTarget.value,
          })
        }
        error={errors?.['discordHandle']?.errors}
      />
    </Fieldset>
  )
}
