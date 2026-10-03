import { BeforeListLink } from '@/collections/_components/BeforeListLink'
import type { LucideIcon } from 'lucide-react'
import type { CollectionSlug } from 'payload'

const BeforeListWrapper = ({ ...props }: Props) => (
  <div
    {...props}
    style={{
      width: '100%',
      paddingInline: 'var(--gutter-h)',
      display: 'flex',
      justifyContent: 'flex-end',
      columnGap: '0.5rem',
      ...props.style,
    }}
  />
)

export const BeforeListLinks = ({
  list,
  slug,
}: {
  slug: CollectionSlug
  list: {
    Icon: LucideIcon
    slug: CollectionSlug
    label: string
  }[]
}) => {
  return (
    <BeforeListWrapper>
      {list
        .filter((l) => l.slug != slug)
        .map((ea) => (
          <BeforeListLink
            key={ea.slug}
            Icon={ea.Icon}
            href={`/admin/collections/${ea.slug}`}>
            {ea.label}
          </BeforeListLink>
        ))}
    </BeforeListWrapper>
  )
}
