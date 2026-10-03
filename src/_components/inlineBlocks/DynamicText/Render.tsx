import type { InlineConverter } from '@/_components/blocks/_types'
import { cn } from '@/lib/cn'
import type { DynamicTextBlock } from '@/payload-types'
import { DateTime } from 'luxon'

export const DynamicConverter: InlineConverter<DynamicTextBlock> = ({ node }) => {
  const { value, format } = node.fields

  const now = DateTime.now()
  let returnedText = ''
  switch (value) {
    case 'Current Date':
      returnedText = now.toFormat('LLL dd yyyy')
      break
    case 'Current Time':
      returnedText = now.toFormat('HH:mm')
      break
    case "Current User's Name":
      returnedText = ''
      break
    default:
      returnedText = ''
      break
  }

  return (
    <span
      className={cn(
        format?.bold && 'text-theme-accent font-semibold',
        format?.italic && 'italic',
        format?.underlined && 'underline'
      )}>
      {returnedText}
    </span>
  )
}
