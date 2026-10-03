import { Fieldset } from '@/_components/views/Register/_components/Fieldset'
import { Row } from '@/_components/views/Register/_components/Row'
import type { DispatchFn, FormEntry, FormEntryData } from '@/_components/views/Register/_types'
import { TextField } from '@/components/Form/TextField'
import { FieldError } from '@/components/Form/TextField/FieldError'
import { type FocusEvent } from 'react'

export const Account = ({
  token,
  username,
  email,
  password,
  errors,
  dispatch,
}: Pick<FormEntryData, 'username' | 'email' | 'password' | 'token'> & {
  errors: FormEntry['errors']
  dispatch: DispatchFn
}) => {
  return (
    <Fieldset label='Account'>
      <Row>
        <TextField
          Label={'Token'}
          value={token}
          id='token'
          readOnly={true}
          className='disabled'
          required
          formNoValidate={false}
          error={errors?.['token']?.errors}
        />
        <TextField
          Label={'Username'}
          defaultValue={username}
          id='username'
          autoComplete='username webauthn'
          required
          error={errors?.['username']?.errors}
          onBlur={(e: FocusEvent<HTMLInputElement>) =>
            dispatch({
              field: 'username',
              value: e.currentTarget.value,
            })
          }
        />
      </Row>
      <TextField
        Label='E-Mail'
        id='email'
        autoComplete='email webauthn'
        type='email'
        required
        defaultValue={email}
        onBlur={(e: FocusEvent<HTMLInputElement>) =>
          dispatch({
            field: 'email',
            value: e.currentTarget.value,
          })
        }
        error={errors?.['email']?.errors}
      />
      <Row>
        <TextField
          id='new-password'
          Label={'Password'}
          minLength={8}
          required
          type='password'
          defaultValue={password.newPassword}
          autoComplete='new-password'
          onBlur={(e: FocusEvent<HTMLInputElement>) =>
            dispatch({
              field: 'password',
              value: {
                ...password,
                newPassword: e.currentTarget.value,
              },
            })
          }
          error={errors?.['password']?.properties?.newPassword?.errors}
        />
        <TextField
          minLength={8}
          Label={'Confirm Password'}
          id='confirm-password'
          required
          type='password'
          defaultValue={password.confirmPassword}
          autoComplete='new-password'
          onBlur={(e: FocusEvent<HTMLInputElement>) =>
            dispatch({
              field: 'password',
              value: {
                ...password,
                confirmPassword: e.currentTarget.value,
              },
            })
          }
          error={errors?.['password']?.properties?.confirmPassword?.errors}
        />
        <FieldError error={errors?.['password']?.errors} />
      </Row>
    </Fieldset>
  )
}
