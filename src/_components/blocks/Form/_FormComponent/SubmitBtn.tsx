'use client'

import { Button } from '@/components/Button'

export const SubmitBtn = ({
  isPending,
  btnLabel,
  isSubmitting,
}: {
  btnLabel?: string | null
  isPending?: boolean
  isSubmitting?: boolean
}) => {
  const isDisabled = isPending || isSubmitting

  const lbl = () => {
    if (isDisabled) return 'Submitting....'
    return btnLabel ?? 'Submit'
  }

  return (
    <div className='mt-4 basis-full text-center'>
      <Button
        className='w-1/2'
        type='submit'
        disabled={isDisabled}>
        {lbl()}
      </Button>
    </div>
  )
}
