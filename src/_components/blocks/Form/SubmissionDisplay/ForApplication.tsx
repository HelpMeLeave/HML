import { SubmissionContent } from '@/_components/blocks/Form/SubmissionDisplay/SubmissionContent'
import type { FormSubmission, UserApplication } from '@/payload-types'
import type { UIFieldServerProps } from 'payload'

const ForApplication = async ({ id, req }: UIFieldServerProps) => {
  if (!id) return null

  const application = (await req.payload.findByID({
    collection: 'user-applications',
    id: id as number,
    depth: 2,
    overrideAccess: false,
    req,
  })) as UserApplication

  const submission = application.submission
  if (!submission || typeof submission === 'number') return null

  return <SubmissionContent submission={submission as FormSubmission} />
}

export default ForApplication
