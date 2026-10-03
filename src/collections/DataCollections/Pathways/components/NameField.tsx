import type { Pathway } from '@/payload-types'
import { Link } from '@payloadcms/ui'
import type { DefaultCellComponentProps, TextFieldClient } from 'payload'

const NameField = ({
  collectionSlug,
  ...props
}: DefaultCellComponentProps<TextFieldClient, Pathway>) => {
  const { name, commonName, id } = (props.rowData as Pathway) ?? {}
  if (!name || !id) return null
  return props.link ?
      <Link
        prefetch={false}
        href={`/admin/collections/${collectionSlug}/${id}`}>
        {commonName ?? name}
      </Link>
    : <span>{commonName ?? name}</span>
}

export default NameField
