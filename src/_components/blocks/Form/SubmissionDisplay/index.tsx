import { SubmissionContent } from '@/_components/blocks/Form/SubmissionDisplay/SubmissionContent'
import type { FormSubmission } from '@/payload-types'
import type { UIFieldServerProps } from 'payload'

const SubmissionDisplay = async ({ id, req }: UIFieldServerProps) => {
  if (!id) return null

  const submission = (await req.payload.findByID({
    collection: 'form-submissions',
    id: id as number,
    depth: 1,
    overrideAccess: false,
    req,
  })) as FormSubmission

  return <SubmissionContent submission={submission} />
}

export default SubmissionDisplay
