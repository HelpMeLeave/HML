'use client'
import { NonTemplatePreview } from '@/_components/blocks/CTA/Template/NonTemplatePreview'
import { TemplatePreviewInner } from '@/_components/blocks/CTA/Template/TemplatePreviewInner'
import { TemplateSwitchEl } from '@/_components/blocks/CTA/Template/TemplateSwitchEl'
import type { CTABlock } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { useDocumentInfo, useField } from '@payloadcms/ui'
import { Suspense } from 'react'
// import './style.scss'

// Reads one button group out of form state in the shape the block saves, so the preview goes through the same builder as the site
const useButton = (path: string): Valid<CTABlock['primaryButton']> => {
  const { value: text } = useField<string>({ path: `${path}.text` })
  const { value: actionType } = useField<Valid<CTABlock['primaryButton']>['actionType']>({
    path: `${path}.actionType`,
  })
  const { value: action } = useField<Valid<CTABlock['primaryButton']>['action']>({
    path: `${path}.action`,
  })
  const { value: linkType } = useField<Valid<CTABlock['primaryButton']>['linkType']>({
    path: `${path}.linkType`,
  })
  const { value: url } = useField<string>({ path: `${path}.url` })
  const { value: doc } = useField<Valid<CTABlock['primaryButton']>['doc']>({ path: `${path}.doc` })
  const { value: newTab } = useField<boolean>({ path: `${path}.newTab` })
  return { text, actionType, action, linkType, url, doc, newTab }
}

const TemplateSwitchField = ({ path }: { path: string }) => {
  const prefix = path.includes('.') ? path.replace(/\.[^.]+$/, '') + '.' : ''

  // Own field value
  const { value: useTemplate, setValue: setUseTemplate } = useField<boolean>({
    path,
  })

  // Sibling fields — subscriptions drive re-renders, no useEffect needed
  const { value: templateId } = useField<string | { id: string }>({
    path: `${prefix}template`,
  })
  const { value: titleState } = useField<SerializedEditorState>({
    path: `${prefix}title`,
  })
  const { value: subtitleState } = useField<SerializedEditorState>({
    path: `${prefix}subtitle`,
  })

  const primary = useButton(`${prefix}primaryButton`)
  const secondary = useButton(`${prefix}secondaryButton`)

  const resolvedTemplateId =
    templateId ?
      typeof templateId === 'object' ?
        templateId.id
      : templateId
    : null

  const { collectionSlug } = useDocumentInfo()

  return (
    <div className='flex flex-col gap-y-4'>
      {!collectionSlug
        || (collectionSlug != 'templates' && (
          <TemplateSwitchEl
            onClick={() => setUseTemplate(!useTemplate)}
            useTemplate={useTemplate}
            aria-checked={useTemplate ?? false}
          />
        ))}

      {useTemplate ?
        resolvedTemplateId ?
          <Suspense fallback={<p className='py-2 text-xs text-muted'>Loading preview…</p>}>
            <TemplatePreviewInner templateId={resolvedTemplateId} />
          </Suspense>
        : <p className='py-2 text-xs text-muted'>Select a template to see a preview.</p>
      : <NonTemplatePreview
          titleState={titleState}
          subtitleState={subtitleState}
          primary={primary}
          secondary={secondary}
        />
      }
    </div>
  )
}

export default TemplateSwitchField
