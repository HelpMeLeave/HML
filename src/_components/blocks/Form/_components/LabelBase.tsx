import { cn } from '@/lib/cn'
import { toTitleCase } from '@/lib/textCasing'
import { useRowLabel } from '@payloadcms/ui'
import type { Block } from 'payload'
import { formatLabelFieldType } from '../_lib/formatLabelFieldType'

export const LabelBase = ({
  title,
  titleKey,
}: {
  title: string
  titleKey: string
  level: number
}) => {
  const { data } = useRowLabel() as {
    data: {
      label: string
      required: boolean
      blockType: string
      width: string
    } & Record<typeof titleKey, (Block & { label: string })[]>
  }
  if (!data) return <></>

  let titleField = title ? toTitleCase(title) : null

  if (!titleField) {
    if (data[titleKey] && Array.isArray(data[titleKey])) {
      titleField = data[titleKey][0]?.['label']
    } else {
      titleField = data.label
    }
  }

  return (
    <div
      className={cn(
        'pill pill--style-white pill--size-small blocks-field__block-pill blocks-field__block-pill-select flex! w-full capitalize!',
        data.required && 'text-red-500!'
      )}>
      {title ?
        titleField
      : <>
          <span className={cn('overflow-hidden text-base font-medium text-ellipsis')}>
            {(titleField as string) ?? '[ Untitled ]'}
          </span>
          <span className='mx-2 font-mono text-[0.65rem] uppercase italic opacity-75'>
            {formatLabelFieldType(data.blockType)} Field
          </span>
        </>
      }
    </div>
  )
}
