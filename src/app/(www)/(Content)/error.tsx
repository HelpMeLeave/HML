'use client'

import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ContentError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const router = useRouter()

  return (
    <div className='flex flex-1 flex-wrap items-center justify-center gap-4 p-8 text-center'>
      <p className='text-muted-foreground basis-full text-sm'>
        Something went wrong loading this page.
      </p>

      <Button
        onClick={reset}
        className='text-sm underline underline-offset-4'>
        Try again
      </Button>
      <Button
        onClick={router.back}
        className='text-sm underline underline-offset-4'>
        Go Back
      </Button>
    </div>
  )
}
