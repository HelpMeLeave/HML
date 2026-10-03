import { NameField } from '@/_components/fields/Name'
import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { rowField } from '@/collections/_fields/Flex'
import { isoField, isoStringField } from '@/collections/DataCollections/Countries/Fields/ISO'
import { isoToString } from '@/collections/DataCollections/Countries/lib'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import type { CountriesSelect } from '@/payload-types'
import type { CollectionConfig, Field } from 'payload'

const overview: Omit<CollectionConfig<'countries'>, 'fields'> = {
  slug: 'countries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['workflow', 'id', 'name'],
    components: {
      views: {
        edit: {
          pathways: {
            tab: {
              Component: '@/collections/DataCollections/Countries/Components/PathwaysTab',
            },
          },
        },
      },
    },
  },
  defaultSort: 'name',
  hooks: {
    afterRead: [isoToString],
  },
  defaultPopulate: {
    id: true,
    name: true,
    currency: true,
    pathways: true,
  },
  access: {
    readVersions: () => true,
    read: () => true,
    update: is({ team: 'Research' }).Team,
  },
  timestamps: false,
  custom: {
    workflow: {
      locksAt: 'submitted',
      flow: {
        wip: { pillLabel: 'WIP' },
        submitted: { pillLabel: 'Pending' },
        published: true,
      },
      track: {
        countryDatas: false,
        pathways: false,
        idString: false,
        mapSvgPath: false,
      } as CountriesSelect<false>,
    },
  },
  labels: {
    singular: tFn('title:country'),
    plural: tFn('title:countries'),
  },
}

const fields: Field[] = [
  {
    type: 'checkbox',
    name: 'unMember',
    defaultValue: false,
  },
  rowField(
    {},
    isoStringField,
    NameField({
      name: 'name',
      required: true,
      unique: true,
      label: 'Country Name',
    })
  ),
  rowField(
    {
      admin: {
        hideGutter: true,
      },
    },
    // #region ! ---------- CURRENCY ----------
    {
      admin: {
        components: {
          Field: '@/collections/DataCollections/Countries/Components/Currencies',
        },
      },
      defaultValue: [],
      name: 'currency',
      type: 'json',
      label: 'Currencies',
    },
    // #endregion ! --------------------

    // #region ! ---------- LANGUAGE ----------
    {
      admin: {
        components: {
          Field: '@/collections/DataCollections/Countries/Components/Languages',
        },
        disableListColumn: true,
      },
      defaultValue: [],
      name: 'language',
      type: 'json',
      label: 'Languages',
    }
    // #endregion ! --------------------
  ),

  {
    type: 'tabs',
    tabs: [
      {
        label: 'Pathways',
        fields: [
          {
            type: 'join',
            name: 'pathways',
            collection: 'pathways',
            label: false,
            on: 'country',
            admin: {
              ...listDisabled,
              defaultColumns: ['name', 'description'],
            },
          },
        ],
      },
      {
        label: 'Media',
        fields: [
          {
            name: 'countryImage',
            type: 'upload',
            relationTo: 'country-images',
            admin: {
              ...listDisabled,
            },
            filterOptions: ({ data }) => ({
              filename: {
                like: `${data.id}%`,
              },
            }),
          },
        ],
      },
      {
        label: 'Statistical Data',
        fields: [
          {
            type: 'join',
            collection: 'indicator-values',
            on: 'country',
            name: 'countryDatas',
            admin: {
              ...listDisabled,
              defaultColumns: ['indicator', 'latestDisplay'],
              allowCreate: false,
            },
          },
        ],
      },
    ],
  },

  // #region ! ---------- HIDDEN FIELDS ----------
  {
    type: 'textarea',
    name: 'mapSvgPath',
    label: 'Path Data',
    admin: {
      ...listDisabled,
      hidden: true,
    },
  },
  {
    type: 'text',
    name: 'iso-2',
    admin: {
      hidden: true,
    },
  },
  isoField,

  // #endregion ! --------------------
]

const CountriesCollectionConfig: CollectionConfig<'countries'> = {
  ...overview,
  fields,
}

export default CountriesCollectionConfig
