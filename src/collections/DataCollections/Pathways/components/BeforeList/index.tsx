import { BeforeListLinks } from '@/collections/_components/BeforeListWrapper'
import { type LucideIcon, BookOpenText, Globe2, LayoutDashboard, SignpostBig } from 'lucide-react'
import type { CollectionSlug } from 'payload'

const list: {
  Icon: LucideIcon
  slug: CollectionSlug
  label: string
}[] = [
  {
    Icon: LayoutDashboard,
    slug: 'pathway-categories',
    label: 'Pathway Categories',
  },

  {
    Icon: SignpostBig,
    slug: 'pathways',
    label: 'Pathways',
  },
  {
    Icon: Globe2,
    slug: 'countries',
    label: 'Countries',
  },
  {
    Icon: BookOpenText,
    slug: 'glossary-term',
    label: 'Glossary',
  },
]

const PathwaysBeforeList = ({ slug }: { slug: CollectionSlug }) => {
  return (
    <BeforeListLinks
      list={list}
      slug={slug}
    />
  )
}

export default PathwaysBeforeList
