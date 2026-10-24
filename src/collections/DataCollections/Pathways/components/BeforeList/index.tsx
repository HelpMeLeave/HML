import { BeforeListLinks } from '@/collections/_components/BeforeListWrapper'
import { Book, Dashboard, Globe, Trip, type BoxIcon } from '@boxicons-pro/react'
import type { CollectionSlug } from 'payload'

const list: {
  Icon: BoxIcon
  slug: CollectionSlug
  label: string
}[] = [
  {
    Icon: Dashboard,
    slug: 'pathway-categories',
    label: 'Pathway Categories',
  },

  {
    Icon: Trip,
    slug: 'pathways',
    label: 'Pathways',
  },
  {
    Icon: Globe,
    slug: 'countries',
    label: 'Countries',
  },
  {
    Icon: Book,
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
