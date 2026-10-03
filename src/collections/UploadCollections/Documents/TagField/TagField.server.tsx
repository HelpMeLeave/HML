import TagClientField from '@/collections/UploadCollections/Documents/TagField/TagField.client'
import type { Tag } from '@/payload-types'
import type { RelationshipFieldServerProps } from 'payload'

const TagField = async (props: RelationshipFieldServerProps) => {
  const { docs } = await props.req.payload.find({
    collection: 'tag',
    select: {
      parent: true,
      parentTitle: true,
      children: true,
      title: true,
    },
    pagination: false,
    req: props.req,
  })

  return (
    <TagClientField
      dimensions={docs as Tag[]}
      field={props.clientField}
      path={props.path}
    />
  )
}

export default TagField
