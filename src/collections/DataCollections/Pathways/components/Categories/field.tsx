import { parseDocs } from '@/collections/DataCollections/Pathways/components/Categories/_lib'
import { CategorySelectClient } from '@/collections/DataCollections/Pathways/components/Categories/client'
import type { RelationshipFieldServerProps } from 'payload'

const CategorySelect = async ({ ...props }: RelationshipFieldServerProps) => {
  const { docs } = await props.req.payload.find({
    collection: 'pathway-categories',
    req: props.req,
    select: {
      path: true,
      title: true,
    },
    pagination: false,
  })

  if (docs) {
    const data = parseDocs(docs)
    return (
      <div>
        <CategorySelectClient
          data={data}
          field={props.clientField}
          path={props.path}
          permissions={props.permissions}
        />
      </div>
    )
  }
  return <></>
}

export default CategorySelect
