import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { rowField } from '@/collections/_fields/Flex'
import { JoinConfig } from '@/collections/_lib/Join'
import { LinkConfig } from '@/collections/_lib/Link'
import { TextConfig } from '@/collections/_lib/Text'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import type { CollectionConfig } from 'payload'

const componentPathBase = '@/_config/plugins/Plugin-Workflow/_components/Pill'

const RoutesCollectionConfig: CollectionConfig<'routes'> = {
  slug: 'routes',
  defaultPopulate: {
    url: true,
    adminTitle: true,
    public: true,
    doc: true,
    docUrl: true,
    tagline: true,
  },
  admin: {
    useAsTitle: 'adminTitle',
    defaultColumns: ['adminTitle', 'url', 'latestFlow'],
    groupBy: true,
  },
  access: {
    read: is().Location.NotAdmin,
  },
  defaultSort: 'adminTitle',
  enableQueryPresets: true,
  timestamps: false,
  hooks: {
    beforeChange: [
      ({ data, context }) => {
        if (!data.doc || (context?.skipRouteChange && Boolean(context?.skipRouteChange))) return

        if (context.routeSlug && context.routeAdminTitle) {
          const parent = data.parentUrl ?? ''
          data.url = [parent, context.routeSlug].filter(Boolean).join('/')
          data.adminTitle = `${context.routeAdminTitle} [${data.url}]`
        }
        context.skipRouteChange = true
      },
    ],
  },
  labels: {
    singular: tFn('title:route'),
    plural: tFn('title:routes'),
  },
  lockDocuments: false,
  fields: [
    TextConfig('adminTitle', { label: 'Title', admin: { readOnly: true } }),
    rowField(
      {},
      {
        type: 'relationship',
        relationTo: 'content',
        name: 'doc',
        hasMany: false,
        admin: { disableGroupBy: true, disableListColumn: true, disableListFilter: false },
        access: { update: is().Role.Director },
      },
      LinkConfig('url', {
        required: true,
        unique: true,
        access: { update: is().Role.Director },
      })
    ),
    { type: 'textarea', name: 'tagline' },
    TextConfig('keywords', { hasMany: true }),
    // #region ! ---------- sidebar ----------
    {
      type: 'relationship',
      virtual: 'doc.currentLifecycle.published',
      name: 'public',
      relationTo: 'content-record',
      admin: { ...listDisabled, position: 'sidebar' },
    },
    TextConfig('docUrl', {
      virtual: 'doc.slug',
      label: 'Doc Slug',
      admin: { position: 'sidebar' },
    }),
    {
      type: 'relationship',
      relationTo: 'routes',
      name: 'parent',
      hasMany: false,
      admin: { position: 'sidebar' },
    },
    JoinConfig('children', 'routes', 'parent', {
      hasMany: false,
      allowCreate: false,
      defaultColumns: ['adminTitle'],
      position: 'sidebar',
    }),
    // #endregion ! --------------------
    TextConfig('parentUrl', { virtual: 'parent.url', admin: { hidden: true } }),
    TextConfig('latestFlow', {
      virtual: 'doc.flow',
      admin: { components: { Cell: componentPathBase + '/Cell', Field: componentPathBase } },
    }),
    TextConfig('type', { virtual: 'doc.contentType', admin: { hidden: true } }),
  ],
  versions: false,
}

export default RoutesCollectionConfig
