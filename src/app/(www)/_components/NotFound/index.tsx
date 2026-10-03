'use client'

import { Button } from '@/components/Button'
import {
  Main,
  MainEyebrow,
  MainHeading,
  MainHGroup,
  MainSubtitle,
} from '@/components/Structure/Main'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const NotFound = () => {
  const router = useRouter()

  return (
    <Main
      data-page='not-found'
      data-layout='constrained'>
      <MainHGroup>
        <MainEyebrow>404</MainEyebrow>
        <MainHeading>Not Found</MainHeading>
        <MainSubtitle>Sorry, we couldn’t find the page you’re looking for.</MainSubtitle>
      </MainHGroup>
      <Button
        className='text-theme-accent -left-4 flex items-center justify-start gap-x-2'
        type='button'
        variant='ghost'
        onClick={router.back}>
        <ArrowLeft className='size-4' />
        Back to Home
      </Button>
    </Main>
  )
}
