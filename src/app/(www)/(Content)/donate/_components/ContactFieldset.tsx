import { NextButton } from '@/app/(www)/(Content)/donate/_components/BtnGrp'
import { TransitionFieldset } from '@/app/(www)/(Content)/donate/_components/TransitionFieldset'
import { handleBtnClick } from '@/app/(www)/(Content)/donate/_lib/btnClick'
import { STEPS } from '@/app/(www)/(Content)/donate/_lib/STEPS'
import type { CustomerDataType, DonationData } from '@/app/(www)/(Content)/donate/_types'
import { Checkbox, CheckboxField } from '@/components/Form/Checkbox'
import { Description, Field, FieldRow, Label } from '@/components/Form/Fieldset'
import { Input, InputGroup } from '@/components/Form/Input'
import { Mail, MoveRight } from 'lucide-react'
import type { ChangeEvent, Dispatch } from 'react'
import z from 'zod'

const validate = (data: CustomerDataType): data is Valid<CustomerDataType> => {
  const firstName = z.string().trim().min(2).max(20)
  const lastName = z.string().nullish()
  const email = z.email()
  const newsletter = z.boolean().prefault(false)

  return z.object({ firstName, lastName, email, newsletter }).validate(data)
}

export const ContactFieldset = ({
  customerData,
  customerDataAction,
  transactionData,
  dispatchTransactionDataAction,
}: {
  customerData: CustomerDataType
  transactionData: DonationData
  customerDataAction: ({ currentTarget }: ChangeEvent<HTMLInputElement>) => void
  dispatchTransactionDataAction: Dispatch<Partial<DonationData>>
}) => {
  const { sessionId } = transactionData

  const nextStep = {
    prevStep: STEPS[0],
    step: STEPS[1],
  }

  const handleNext = async () => {
    if (nextStep.step != 'amount' || sessionId)
      dispatchTransactionDataAction({
        ...nextStep,
      })

    const newSession = await handleBtnClick(transactionData, customerData)

    dispatchTransactionDataAction({
      ...transactionData,
      ...newSession,
      ...nextStep,
    })
  }

  return (
    <>
      <TransitionFieldset
        transactionData={transactionData}
        thisStep='contact'>
        <FieldRow>
          <Field aria-required='true'>
            <Label>First Name</Label>
            <Input
              autoFocus
              name='firstName'
              onChange={customerDataAction}
              autoComplete='given-name'
              defaultValue={customerData.firstName ?? undefined}
            />
          </Field>
          <Field>
            <Label>Last Name</Label>
            <Input
              defaultValue={customerData.lastName ?? undefined}
              name='lastName'
              onChange={customerDataAction}
              autoComplete='family-name'
            />
          </Field>
        </FieldRow>
        <Field aria-required='true'>
          <Label required>E-Mail</Label>
          <InputGroup className='group'>
            <Mail
              data-slot='icon'
              className='opacity-50 group-focus-within:opacity-100'
            />
            <Input
              defaultValue={customerData.email ?? undefined}
              type='email'
              name='email'
              onChange={customerDataAction}
            />
          </InputGroup>
          <Description>
            We will <span className='text-accent'>never</span> share your information with any third
            parties without your explicit permission.
          </Description>
        </Field>
        <CheckboxField>
          <Checkbox
            defaultChecked={customerData.newsletter}
            name='newsletter'
            onChange={(v) =>
              customerDataAction({
                currentTarget: { name: 'newsletter', value: String(v) },
              } as unknown as ChangeEvent<HTMLInputElement, Element>)
            }
          />
          <Label>Stay Informed</Label>
          <Description className='flex flex-col gap-2 leading-normal!'>
            <span className='text-[0.8rem]'>
              Receive future updates and newsletters about our work.
            </span>
          </Description>
        </CheckboxField>
      </TransitionFieldset>

      {transactionData.step == 'contact' && validate(customerData) && (
        <div className='mt-auto flex w-full justify-between gap-12'>
          <NextButton
            label={'Next'}
            Icon={MoveRight}
            onClick={handleNext}
          />
        </div>
      )}
    </>
  )
}
