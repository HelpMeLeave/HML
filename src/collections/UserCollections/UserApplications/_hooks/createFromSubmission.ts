import type { CollectionAfterChangeHook } from 'payload'

const VOLUNTEER_FORM_ID = 1

export const createApplicationFromSubmission: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') return
  const formId = typeof doc.form === 'object' ? doc.form.id : doc.form
  if (formId !== VOLUNTEER_FORM_ID) return

  const nameEntry = doc.submissionData?.find(
    (entry: { field: string; value: string }) => entry.field === 'name'
  )
  const name: string = nameEntry?.value || 'Unnamed Application'

  await req.payload.create({
    collection: 'user-applications',
    data: { name, submission: doc.id },
    req,
  })
}
