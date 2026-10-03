import { UpdateStepNav } from '@/_components/views/Base/StepNav'
import { cn } from '@/lib/cn'
import { Gutter } from '@payloadcms/ui'

export type ParamType = {
  segments: Array<string | { label?: string | null; value: string }>
}

export const DocumentViewTemplate = ({
  ...params
}: {
  params: {
    collection: string
    title: string
    tab: string
    docId: string
  }
} & Props<'section'>) => {
  const {
    params: { collection, title, tab, docId },
    ...rest
  } = params
  return (
    <Gutter className='document-view'>
      <UpdateStepNav
        params={{
          segments: [
            { value: 'collections', label: null },
            collection,
            { label: title, value: docId },
            tab,
          ],
        }}
      />
      <section
        {...rest}
        className={cn('mx-auto flex flex-wrap gap-x-2 gap-y-12 lg:max-w-4xl', rest.className)}
      />
    </Gutter>
  )
}
