'use client'

import type { InitRole } from '@/_components/views/Register'
import { Buttons } from '@/_components/views/Register/_components/Buttons'
import { formReducer } from '@/_components/views/Register/_lib'
import type { FormProps } from '@/_components/views/Register/_types'
import { Account } from '@/_components/views/Register/Account'
import { Details } from '@/_components/views/Register/Details'
import { register } from '@/_components/views/Register/register'
import { DateTime } from 'luxon'
import { useReducer, type SubmitEvent } from 'react'

export const Form = ({
  username,
  initRole,
  token,
  children,
}: Partial<FormProps> & {
  token: string
  children?: ReactNode
  username: string
  initRole?: InitRole
}) => {
  const [{ data, errors }, dispatch] = useReducer(formReducer, {
    data: {
      email: null as unknown as string,
      username,
      firstName: null,
      lastName: null,
      pronouns: [],
      discordHandle: null,
      name: null,
      token,
      date: DateTime.now().toFormat('LLL dd yyyy'),
      signature: null as unknown as string,
      password: {
        newPassword: null as unknown as string,
        confirmPassword: null as unknown as string,
      },
    },
    errors: {},
  })
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.stopPropagation()
    const formData = e.currentTarget

    const submissionData = {
      ...data,
      signature: (formData.elements.namedItem('field-signature') as HTMLInputElement)?.value,
      initRole,
    }

    if (submissionData.signature && errors && Object.keys(errors).some((ea) => ea != 'signature')) {
      return null
    }

    await register(submissionData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='hover:border-input-border-hover flex flex-col gap-y-6 rounded-2xl border border-input-border bg-card px-4 py-6 shadow-input'>
      <Account
        username={data.username}
        token={data.token}
        email={data.email}
        password={data.password}
        errors={errors}
        dispatch={dispatch}
      />
      <Details
        firstName={data.firstName}
        lastName={data.lastName}
        pronouns={data.pronouns}
        discordHandle={data.discordHandle}
        name={data.name}
        errors={errors}
        dispatch={dispatch}
      />
      {children}
      <Buttons />
    </form>
  )
}
