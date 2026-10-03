import type { Form } from '@/payload-types'
import type { CollectionAfterChangeHook } from 'payload'
import { replaceDoubleCurlys } from './replaceDoubleCurlys'
import { serializeLexical } from './serializeLexical'
import { serializeSlate } from './serializeSlate'

export const sendEmail: CollectionAfterChangeHook = async ({ operation, data, doc, req }) => {
  if (operation !== 'create') return

  const { payload, locale } = req
  const formId = typeof data.form === 'object' ? (data.form as { id: number }).id : data.form
  const submissionData: { field: string; value: string }[] = [
    ...(data.submissionData ?? []),
    { field: 'formSubmissionID', value: String(doc.id) },
  ]

  try {
    const form = (await payload.findByID({
      id: formId,
      collection: 'forms',
      locale,
      req,
    })) as Form

    const emails = form.emails
    if (!emails?.length) {
      payload.logger.info({ msg: 'No emails to send.' })
      return
    }

    await Promise.all(
      emails.map(async (email) => {
        const {
          bcc: emailBCC,
          cc: emailCC,
          emailFrom,
          emailTo,
          message,
          replyTo: emailReplyTo,
          subject,
        } = email

        const to = replaceDoubleCurlys(emailTo ?? '', submissionData)
        const cc = emailCC ? replaceDoubleCurlys(emailCC, submissionData) : ''
        const bcc = emailBCC ? replaceDoubleCurlys(emailBCC, submissionData) : ''
        const from = replaceDoubleCurlys(emailFrom ?? '', submissionData)
        const replyTo = replaceDoubleCurlys(emailReplyTo ?? emailFrom ?? '', submissionData)

        const isLexical =
          message && !Array.isArray(message) && typeof message === 'object' && 'root' in message
        const bodyHtml =
          isLexical ?
            await serializeLexical(
              message as Parameters<typeof serializeLexical>[0],
              submissionData
            )
          : serializeSlate(message as Parameters<typeof serializeSlate>[0], submissionData)

        try {
          await payload.sendEmail({
            bcc,
            cc,
            from,
            html: `<div>${bodyHtml}</div>`,
            replyTo,
            subject: replaceDoubleCurlys(subject, submissionData),
            to,
          })
        } catch (err) {
          payload.logger.error({ err, msg: `Error sending email to: ${to}` })
        }
      })
    )
  } catch (err) {
    payload.logger.error({ err, msg: `Error sending emails for form submission ${doc.id}` })
  }
}
