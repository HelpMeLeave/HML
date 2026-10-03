import { rowField } from '@/collections/_fields/Flex'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import type { Condition, Field } from 'payload'

const hasTopic =
  (include: number): Condition =>
  (data) => {
    if (!data || !data?.topic) return false
    const { topic } = data
    if (Array.isArray(topic)) {
      return topic.includes(include)
    }
    return true
  }

export const TagFields: Field[] = [
  {
    type: 'relationship',
    relationTo: 'tag',
    hasMany: true,
    label: 'Topic(s)',
    name: 'topic',
    filterOptions: {
      'parent.title': {
        equals: 'topic',
      },
    },
    admin: {
      ...listDisabled,
    },
  },
  {
    type: 'relationship',
    relationTo: 'tag',
    hasMany: true,
    name: 'campaign',
    admin: {
      className: 'empty:hidden',
      condition: hasTopic(9),
      ...listDisabled,
    },
    filterOptions: {
      'parent.id': {
        equals: 9,
      },
    },
  },
  {
    type: 'relationship',
    relationTo: 'countries',
    hasMany: true,
    name: 'country',
    admin: {
      condition: hasTopic(15),
      ...listDisabled,
    },
  },
  rowField(
    {
      admin: {
        condition: hasTopic(16),
      },
    },
    {
      type: 'relationship',
      relationTo: 'pathways',
      hasMany: true,
      name: 'pathway',
      admin: {
        condition: hasTopic(16),
        ...listDisabled,
      },
    },
    {
      type: 'relationship',
      relationTo: 'pathway-categories',
      hasMany: true,
      name: 'pathwayCategory',
      admin: {
        condition: hasTopic(16),
        ...listDisabled,
      },
    }
  ),
  {
    type: 'relationship',
    relationTo: 'tag',
    hasMany: true,
    label: 'Timeline',
    name: 'timeline',
    filterOptions: {
      'parent.title': {
        equals: 'timeline',
      },
    },
    admin: {
      ...listDisabled,
    },
  },
]
