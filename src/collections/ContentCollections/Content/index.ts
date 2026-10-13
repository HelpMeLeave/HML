import { PageGroupBlockConfig } from '@/_components/blocks/PageGroup'
import { QuoteBlockConfig } from '@/_components/blocks/Quote'
import { ColumnsBlockConfig, CTABlockConfig, VideoPlayerBlockConfig } from '@/_config/Blocks'
import { tFn } from '@/_config/i18n/'
import { defaultFlow } from '@/_config/plugins/Plugin-Workflow/shared/flowBtns'
import { is } from '@/access/is'
import { isPillar } from '@/access/PillarTeam'
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
import { previewURL } from '@/collections/ContentCollections/Content/_lib/previewURL'
import type { tContentType } from '@/collections/ContentCollections/Content/_lib/types'
import { contentEditor, singleLineEditor } from '@/lexicals/editors'
import { assignHeadingIds } from '@/lexicals/Features/_lib/slugifyHeadingID'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import { filterMedia } from '@/lib/filterBy'
import { RootNode } from '@/lib/RootNode'
import type { Content } from '@/payload-types'
import {
  type CollapsibleField,
  type CollectionConfig,
  type Field,
  type RelationshipField,
  type Where,
} from 'payload'

const contentTypeFilters: Partial<Record<tContentType, Where>> = {
  resource: { 'parent.id': { equals: 1 } },
  report: { 'parent.id': { in: [9, 2] } },
  statement: { id: { equals: 8 } },
}

const SubtitleField = RichTextConfig(
  'subtitle',
  singleLineEditor({ namespace: 'pageSubtitle', placeholder: 'Subtitle....' }),
  {
    admin: { condition: hasContentType, className: 'page-subtitle', ...listDisabled },
    access: {
      update: ({ data }: { data?: Partial<Content> }) =>
        Boolean(data?.flow && !data?.currentLifecycle?.locked && !['deleted'].includes(data.flow)),
    },
    label: false,
    defaultValue: RootNode(),
  }
)

const ContentField = () =>
  RichTextConfig(
    'content',
    contentEditor({
      blocks: [
        ColumnsBlockConfig,
        CTABlockConfig,
        PageGroupBlockConfig,
        VideoPlayerBlockConfig,
        QuoteBlockConfig,
      ],
    }),
    {
      access: {
        update: ({ data }: { data?: Partial<Content> }) =>
          Boolean(
            data?.flow && !data?.currentLifecycle?.locked && !['deleted'].includes(data.flow)
          ),
      },
      label: false,
      admin: { condition: hasContentType, ...listDisabled },
      hooks: { beforeChange: [assignHeadingIds] },
    }
  )

const UsersField: RelationshipField = {
  type: 'relationship',
  relationTo: 'users',
  name: 'assignedUsers',
  hasMany: true,
  admin: { position: 'sidebar', condition: hasContentType },
}

const AuthorsField: RelationshipField = {
  type: 'relationship',
  relationTo: ['users', 'teams', 'pillar'],
  name: 'authors',
  label: 'Author(s)',
  hasMany: true,
  admin: {
    position: 'sidebar',
    sortOptions: { users: 'name', teams: 'name', pillar: 'name' },
    ...listDisabled,
    condition: contentNotHub,
    appearance: 'drawer',
  },
  filterOptions: ({ relationTo, data }) => {
    if (!data || !data.contentType) return false
    const type: tContentType = data.contentType

    if (type == 'blog') return relationTo == 'users'

    if (relationTo == 'users') {
      if (type == 'statement') return false
    }
    return true
  },
}

const TypeField: RelationshipField = {
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

const OtherBrowField = RichTextConfig(
  'other-brow',
  singleLineEditor({ namespace: 'pageBrow', placeholder: 'Brow....' }),
  {
    admin: {
      className: 'page-brow',
      condition: (data) => data?.contentType == 'other',
      ...listDisabled,
    },
    label: false,
  }
)

const TagsField: CollapsibleField = {
  type: 'collapsible',
  label: 'Tags',
  admin: { position: 'sidebar', condition: hasContentType },
  fields: TagFields,
}

const MediaField: CollapsibleField = {
  type: 'collapsible',
  label: 'Media',
  admin: { position: 'sidebar', condition: hasContentType },
  fields: [
    // #region ! ---------- TODO: WILL IMPLEMENT LATER ----------
    {
      type: 'relationship',
      label: 'Documents',
      relationTo: 'documents',
      name: 'asPdf',
      virtual: true,
      admin: { appearance: 'drawer', readOnly: false },
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
      admin: { condition: (_data, siblingData) => siblingData?.asPdf },
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
}

const AuthorStringField = TextConfig('authorString', {
  virtual: true,
  label: 'Author(s)',
  admin: { hidden: true },
  hooks: { afterRead: [afterReadAuthorString] },
})

const fields: Field[] = Object.values({
  'other-brow': OtherBrowField,
  type: TypeField,
  title: ContentTitleField,
  subtitle: SubtitleField,
  content: ContentField(),
  route: RouteJoinField,
  slug: SlugField,
  slugGenerated: SlugGeneratedField,
  users: UsersField,
  authors: AuthorsField,
  tags: TagsField,
  media: MediaField,
  authorString: AuthorStringField,
  test: {
    // TODO:Consider combinging routes?
    type: 'group',
    virtual: true,
    name: 'test',
    admin: { readOnly: false, hidden: true },
    fields: [
      {
        type: 'text',
        name: 'adminTitle',
        custom: {
          replacer: {
            type: 'compound-title',
            fieldNames: ['title', 'slug'],
            admin: { fn: () => '' },
          },
        },
        hooks: {
          afterRead: [({ data, value }) => (!value ? `${data?.title} [/${data?.slug}]` : value)],
        },
      },
      { type: 'text', name: 'url' },
      {
        type: 'relationship',
        relationTo: 'content',
        name: 'parent',
        hasMany: false,
      } as RelationshipField,
      { type: 'text', name: 'tagline' },
    ],
  },
})

const ContentCollectionConfig: CollectionConfig<'content'> = {
  slug: 'content',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'workflow', 'route', 'slug'],
    groupBy: true,
    listSearchableFields: ['title', 'slug'],
    livePreview: {
      url: ({ data, req }) => previewURL(data.id, req),
      openByDefault: true,
    },
  },
  folders: { browseByFolder: true },
  custom: {
    workflow: {
      track: { asPdf: false, contentType: false, slugGenerated: false, timeline: false },
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
  labels: { singular: tFn('title:content'), plural: tFn('title:contents') },
  timestamps: false,
  access: {
    create: is().Role.Director,
    update: ({ data, req }) => {
      if (data?.flow == 'deleted') return false
      return isPillar(req.user, 'Marketing')
    },
    delete: is().Bri,
  },
  defaultPopulate: { route: true, flow: true, currentLifecycle: { published: true } },
  fields: [...fields, ...ContentTypeFields],
}

export default ContentCollectionConfig
