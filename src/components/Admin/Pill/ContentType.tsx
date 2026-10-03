import type { tContentType } from '@/collections/ContentCollections/Content/_lib/types'
import { Pill } from '@/components/Admin/Pill'
import { type PillColors } from './_types'

export const PillContentType = ({ type }: { type: tContentType }) => {
  const opts: Partial<Record<tContentType, PillColors>> = {
    hub: 'green',
    resource: 'yellow',
    newsCommentary: 'red',
  }
  return (
    <Pill
      statusOpts={opts}
      status={type}>
      {type.replace(/[A-Z][a-z]+/g, '')}
    </Pill>
  )
}
