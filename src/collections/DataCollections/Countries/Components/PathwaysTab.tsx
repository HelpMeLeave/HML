import { BtnAsLink } from '@/collections/DataCollections/Countries/Components/BtnAsLink'
import type { DocumentTabServerProps } from 'payload'

const PathwaysTab = (props: DocumentTabServerProps) => {
  const { id } = props.req.routeParams ?? {}
  if (id)
    return (
      <BtnAsLink
        href={`/admin/collections/pathways?where[country][equals]=${id}`}
        margin={false}
        buttonStyle='tab'
        disabled={false}>
        Pathways
      </BtnAsLink>
    )
}

export default PathwaysTab
