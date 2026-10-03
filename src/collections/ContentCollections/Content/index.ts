import { editorFull, editorFullBlocks } from '@/_components/lexicals/full'
import { CTABlockConfig } from '@/_config/Blocks'
import { tFn } from '@/_config/i18n/'
import { defaultFlow } from '@/_config/plugins/Plugin-Workflow/shared/flowBtns'
import { is } from '@/access/is'
import { isPillar } from '@/access/PillarTeam'
import { pageBrowLexical, pageSubtitleTitleLexical } from '@/collections/_fields/RichTitle'
import { TagFields } from '@/collections/_fields/Tabs/Tags'
import { RichTextConfig } from '@/collections/_lib/RichText'
import { TextConfig } from '@/collections/_lib/Text'
import { ContentTypeFields } from '@/collections/ContentCollections/Content/_fields/ContentType'
import { RouteJoinField } from '@/collections/ContentCollections/Content/_fields/RouteJoin'
import { SlugField } from '@/collections/ContentCollections/Content/_fields/Slug'
import { SlugGeneratedField } from '@/collections/ContentCollections/Content/_fields/SlugGenerated'
import { ContentTitleField } from '@/collections/ContentCollections/Content/_fields/Title'
import {
  contentNotHub,
  contentTypeCondition,
  hasContentType,
} from '@/collections/ContentCollections/Content/_lib/conditions'
import {
  afterChangeParseRoute,
  afterDeleteRemoveRoute,
  afterReadAuthorString,
  beforeDeleteGetRoute,
} from '@/collections/ContentCollections/Content/_lib/hooks'
import type { tContentType } from '@/collections/ContentCollections/Content/_lib/types'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import { filterMedia } from '@/lib/filterBy'
import { RootNode } from '@/lib/RootNode'
import type { Content } from '@/payload-types'
import { type CollectionConfig, type RelationshipField, type Where } from 'payload'

const CategoryField = (): RelationshipField => {
  const contentTypeFilters: Partial<Record<tContentType, Where>> = {
    resource: {
      'parent.id': {
        equals: 1,
      },
    },
    report: {
      'parent.id': {
        in: [9, 2],
      },
    },
    statement: {
      id: {
        equals: 8,
      },
    },
  }

  return {
    name: 'type',
    type: 'relationship',
    relationTo: 'tag',
    label: 'Category',
    required: true,
    admin: {
      condition: contentTypeCondition('resource', 'report', 'statement'),
      ...listDisabled,
      sortOptions: '-parent.id',
      allowCreate: false,
    },
    filterOptions: ({ data }) => {
      if (!data || !data.contentType) return false
      return contentTypeFilters[data.contentType as tContentType] as Where
    },
  }
}

const ContentCollectionConfig: CollectionConfig<'content'> = {
  slug: 'content',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'workflow', 'route', 'slug'],
    groupBy: true,
  },
  custom: {
    workflow: {
      track: {
        asPdf: false,
        contentType: false,
        slugGenerated: false,
        timeline: false,
      },
      flow: defaultFlow,
      locksAt: ['submitted'],
    },
  },
  hooks: {
    afterChange: [afterChangeParseRoute],
    afterDelete: [afterDeleteRemoveRoute],
    beforeDelete: [beforeDeleteGetRoute],
  },
  enableQueryPresets: true,
  labels: {
    singular: tFn('title:content'),
    plural: tFn('title:contents'),
  },
  timestamps: false,
  access: {
    create: is().Role.Director,
    update: ({ data, req }) => {
      if (data?.flow == 'deleted') return false
      return isPillar(req.user, 'Marketing')
    },
    delete: is().Bri,
  },
  defaultPopulate: {
    route: true,
    flow: true,
    currentLifecycle: {
      published: true,
    },
  },
  fields: [
    // #region ! ---------- CONTENT ----------
    RichTextConfig('other-brow', pageBrowLexical, {
      admin: {
        className: 'page-brow',
        condition: (data) => data?.contentType == 'other',
        ...listDisabled,
      },
      label: false,
    }),
    CategoryField(),
    ContentTitleField,
    RichTextConfig('subtitle', pageSubtitleTitleLexical, {
      admin: {
        condition: hasContentType,
        className: 'page-subtitle',
        ...listDisabled,
      },
      access: {
        update: ({ data }: { data?: Partial<Content> }) =>
          Boolean(
            data?.flow && !data?.currentLifecycle?.locked && !['deleted'].includes(data.flow)
          ),
      },
      label: false,
      defaultValue: RootNode(),
    }),
    RichTextConfig(
      'content',
      editorFull({
        blocks: [...editorFullBlocks.blocks],
        inlineBlocks: editorFullBlocks.inlineBlocks,
      }),
      {
        access: {
          update: ({ data }: { data?: Partial<Content> }) =>
            Boolean(
              data?.flow && !data?.currentLifecycle?.locked && !['deleted'].includes(data.flow)
            ),
        },
        label: false,
        admin: {
          condition: hasContentType,
          ...listDisabled,
        },
      }
    ),
    // #endregion ! --------------------

    // #region ! ---------- SIDEBAR FIELDS ----------
    RouteJoinField,
    SlugField,
    SlugGeneratedField,
    {
      type: 'relationship',
      relationTo: 'users',
      name: 'assignedUsers',
      hasMany: true,
      admin: {
        position: 'sidebar',
        condition: hasContentType,
      },
    },
    {
      type: 'relationship',
      relationTo: ['users', 'teams', 'pillar'],
      name: 'authors',
      label: 'Author(s)',
      hasMany: true,
      admin: {
        position: 'sidebar',
        sortOptions: {
          users: 'name',
          teams: 'name',
          pillar: 'name',
        },
        ...listDisabled,
        condition: contentNotHub,
        appearance: 'drawer',
      },
      filterOptions: ({ relationTo, data }) => {
        if (!data || !data.contentType) return false
        const type: tContentType = data.contentType
        if (type == 'blog') {
          return relationTo == 'users'
        }

        if (relationTo == 'users') {
          if (type == 'statement') return false
        }
        return true
      },
    },
    {
      type: 'collapsible',
      label: 'Tags',
      admin: {
        position: 'sidebar',
        condition: hasContentType,
      },
      fields: TagFields,
    },
    {
      type: 'collapsible',
      label: 'Media',
      admin: {
        position: 'sidebar',
        condition: hasContentType,
      },
      fields: [
        // #region ! ---------- TODO: WILL IMPLEMENT LATER ----------
        {
          type: 'relationship',
          label: 'Documents',
          relationTo: 'documents',
          name: 'asPdf',
          virtual: true,
          admin: {
            appearance: 'drawer',
            readOnly: false,
          },
          access: {
            update: ({ data }: { data?: Partial<Content> }) =>
              Boolean(
                data?.flow && !data?.currentLifecycle?.locked && !['deleted'].includes(data.flow)
              ),
          },
          filterOptions: filterMedia.byType('application/pdf'),
        },
        {
          type: 'blocks',
          name: 'cta',
          label: 'Document CTA',
          blocks: [CTABlockConfig],
          admin: {
            condition: (_data, siblingData) => siblingData?.asPdf,
          },
          access: {
            update: ({ data }) => {
              if (!data) return false
              return data?.workflow != 'submitted' && data.workflow != 'scheduled'
            },
          },
        },
        // #endregion ! --------------------

        {
          label: 'Heading Image',
          type: 'relationship',
          name: 'headerImage',
          relationTo: 'media',
          filterOptions: filterMedia.byType('image'),
          admin: {
            appearance: 'drawer',
            condition: contentTypeCondition('blog', 'resource'),
            ...listDisabled,
          },
        },
      ],
    },
    // #region ! ---------- HIDDEN FIELDS ----------
    ...ContentTypeFields,
    TextConfig('authorString', {
      virtual: true,
      label: 'Author(s)',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [afterReadAuthorString],
      },
    }),
  ],
}

export default ContentCollectionConfig
