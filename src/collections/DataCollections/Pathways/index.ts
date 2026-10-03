import { NameField } from '@/_components/fields/Name'
import { editorParagraphRichText } from '@/_components/lexicals/nested'
import { tFn } from '@/_config/i18n/'
import { isManager } from '@/access/_primitives'
import { is } from '@/access/is'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { getLabelPath } from '@/collections/_labels'
import { CheckboxConfig } from '@/collections/_lib/Checkbox'
import { LinkConfig } from '@/collections/_lib/Link'
import { DescriptionField, TextConfig } from '@/collections/_lib/Text'
import {
  getPathwayPath,
  PathwayCategoriesFieldPath,
  PathwayCostMinMaxPath,
  PathwayIntervalFormatItemPath,
  PathwayNameFieldPath,
} from '@/collections/DataCollections/Pathways/paths'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import { toTitleCase } from '@/lib/textCasing'
import type { CollectionConfig, TextareaField } from 'payload'
import type { Config } from 'payload-workflow'

const Pathways: CollectionConfig<'pathways'> = {
  slug: 'pathways',
  timestamps: true,
  trash: true,
  custom: {
    workflow: {
      flow: {
        wip: {
          pillLabel: 'Work in Process',
          submitted: {
            btnLabel: 'Submit',
            admin: { access: isManager },
          },
        },
        submitted: {
          pillLabel: true,
          published: {
            btnLabel: 'Approve',
          },
          wip: {
            btnLabel: 'Reject',
          },
        },
        published: true,
      },
      track: true,
    } as Config.Obj<'pathways'>,
  },
  defaultPopulate: {
    name: true,
    commonName: true,
    cats: true,
  },
  labels: {
    singular: tFn('title:pathway'),
    plural: tFn('title:pathways'),
  },
  defaultSort: ['country', 'name'],
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'country', 'description', 'visaDuration'],
    groupBy: true,
    listSearchableFields: ['notes'],
    enableListViewSelectAPI: true,
    components: {
      beforeList: [
        {
          path: '@/collections/DataCollections/Pathways/components/BeforeList',
          serverProps: {
            slug: 'pathways',
          },
        },
      ],
    },
  },
  access: {
    update: is({ team: 'Research' }).Team,
  },
  enableQueryPresets: true,
  fields: [
    // #region ! ---------- SIDEBAR FIELDS ----------
    columnField(
      {
        admin: {
          position: 'sidebar',
        },
      },
      {
        name: 'country',
        type: 'relationship',
        relationTo: 'countries',
        hasMany: false,
        label: 'Country',
        required: true,
        admin: {
          allowCreate: false,
          description: 'Country the pathway relates to',
          components: {
            Label: getLabelPath('/FlagLabel'),
          },
        },
      },
      NameField({
        name: 'name',
        required: true,
        label: 'Official Name',
        admin: {
          description: "Name given by the country's government body",
          components: {
            Cell: PathwayNameFieldPath,
            Label: getLabelPath('/FlagLabel'),
          },
        },
      }),
      TextConfig('commonName', {
        admin: {
          description: 'Descriptive name that better describes the pathway',
          components: {
            Label: getLabelPath('/FlagLabel'),
          },
        },
      }),
      LinkConfig('link', {
        required: true,
        admin: {
          description:
            'Must be official government website, or the website they officially recommend to use',
          components: {
            Label: getLabelPath('/FlagLabel'),
          },
        },
      }),
      {
        type: 'relationship',
        relationTo: 'users',
        name: 'assignedUsers',
        hasMany: true,
      }
    ),
    // #endregion ! --------------------

    DescriptionField({
      required: true,
      admin: {
        description: 'Overview of the kind of pathway without including time limits or costs',
        components: {
          Label: getLabelPath('/FlagLabel'),
        },
      },
    }),
    // #region ! ---------- CATEGORIES ----------
    {
      type: 'relationship',
      hasMany: true,
      label: 'Pathway Categories',
      name: 'cats',
      relationTo: 'pathway-categories',
      admin: {
        description: 'Descriptive tags used to sort the pathways for users',
        allowEdit: true,
        components: {
          Field: PathwayCategoriesFieldPath,
          Label: getLabelPath('/FlagLabel'),
        },
      },
    },
    {
      type: 'text',
      virtual: 'cats.title',
      name: 'catsString',
      label: 'Category Strings',
      admin: {
        ...listDisabled,
        hidden: true,
      },
    },
    // #endregion ! --------------------

    // #region ! ---------- COST FIELDS ----------
    rowField(
      {
        label: 'Application Cost',
        labelSize: 'base',
        description:
          'To enter a range cost use a format like: xx - xx. No need to enter the currency sign, that will be added in for you',
      },
      {
        admin: {
          description: 'Used by the country to describe associated costs',
          condition: (_, siblingData) => {
            return siblingData.country != null
          },
          components: {
            Field: getPathwayPath('/CurrencyField'),
          },
        },
        name: 'currency',
        type: 'text',
        label: 'Currency',
      },
      {
        name: 'costData',
        type: 'json',
        label: 'Average Cost',
        defaultValue: {
          min: 0,
          max: 0,
          na: false,
        },
        admin: {
          description: 'How much is the application itself (excluding things like passport costs)',
          ...listDisabled,
          components: {
            Field: PathwayCostMinMaxPath,
            Label: getLabelPath('/FlagLabel'),
          },

          width: 'calc(100% - 120px)',
        },
      }
    ),
    // #endregion ! --------------------

    // #region ! ---------- TIMING ----------
    rowField(
      {
        labelSize: 'base',
        label: 'Timing Details',
      },
      {
        type: 'json',
        name: 'processingTime',
        defaultValue: {
          min: {
            qty: 0,
            uom: null,
            business: false,
          },
          max: {
            qty: 0,
            uom: null,
            business: false,
          },
        },
        label: 'Processing Time',
        admin: {
          description:
            'How much time does it typically take to be processed once received by the destination country?',
          ...listDisabled,
          components: {
            Field: PathwayIntervalFormatItemPath,
            Label: getLabelPath('/FlagLabel'),
          },
          width: 'calc(100% - 120px)',
        },
      },
      {
        type: 'json',
        name: 'visaDuration',
        label: 'Visa Duration',
        defaultValue: {
          min: {
            qty: 0,
            uom: null,
            business: false,
          },
          max: {
            qty: 0,
            uom: null,
            business: false,
          },
        },
        admin: {
          description:
            'How long does the pathway allow the person to stay within the country legally?',
          ...listDisabled,
          components: {
            Field: PathwayIntervalFormatItemPath,
            Label: getLabelPath('/FlagLabel'),
          },

          width: 'calc(100% - 120px)',
        },
      }
    ),
    // #endregion ! --------------------

    // #region ! ---------- PIPELINES ----------
    columnField(
      {
        labelSize: 'base',
        label: 'Pathway Pipelines',
        description: 'Long term options using this pathway',
        admin: {
          custom: {
            label: 'flag',
          },
        },
      },
      rowField(
        {},
        CheckboxConfig('renewable', {
          label: 'Renewable',
          admin: {
            components: {
              Label: getLabelPath('/FlagLabel'),
            },
          },
        }),
        CheckboxConfig('citizenshipPathway', {
          label: 'Pathway to Citizenship',
          admin: {
            components: {
              Label: getLabelPath('/FlagLabel'),
            },
          },
        })
      ),
      rowField(
        {},
        CheckboxConfig('residencyPathway', {
          label: 'Pathway to Residency',
          admin: {
            components: {
              Label: getLabelPath('/FlagLabel'),
            },
          },
        }),
        CheckboxConfig('reunificationPathway', {
          label: 'May Allow Reunification',
          admin: {
            components: {
              Label: getLabelPath('/FlagLabel'),
            },
          },
        })
      ),
      columnField(
        // #region ! ---------- NOT VISIBLE ----------
        {
          labelSize: 'large',
          label: 'Pipeline Notes',
          admin: {
            condition: () => false,
          },
        },
        ...(['renewable', 'citizenshipPathway', 'residencyPathway', 'reunificationPathway'].map(
          (f) => ({
            type: 'textarea',
            name: `pipelineNotes${toTitleCase(f)}`,
            label: `${toTitleCase(f.replace(/([A-Z])/, ' $1'))} Notes`,
            admin: {
              condition: () => false,
              components: {
                Label: getLabelPath('/FlagLabel'),
              },
            },
          })
        ) as TextareaField[])
        // #endregion ! --------------------
      )
    ),
    // #endregion ! --------------------

    // #region ! ---------- NOTES ----------
    columnField(
      {
        labelSize: 'large',
        label: 'notes',
      },
      {
        name: 'notes',
        type: 'array',
        label: false,
        admin: {
          initCollapsed: true,
          disableListColumn: true,
          disableBulkEdit: true,
        },
        fields: [
          {
            label: false,
            type: 'textarea',
            name: 'note',
          },
        ],
      }
    ),
    // #endregion ! --------------------

    rowField(
      {
        label: 'Restrictions',
        labelSize: 'base',
      },
      {
        type: 'array',
        name: 'restrictedNationalities',
        admin: {
          description: 'No entry nationalities, or other restrictions related to nationality',
        },
        labels: {
          singular: 'Nationality',
          plural: 'Nationalities',
        },
        fields: [
          {
            type: 'relationship',
            relationTo: 'countries',
            name: 'nationality',
            label: 'Country',
            required: true,
          },
          {
            type: 'textarea',
            name: 'notes',
            label: 'Notes',
          },
        ],
      },

      {
        name: 'restrictions',
        label: 'Other',
        admin: {
          description: 'General restrictions and limitations that may apply',
        },
        type: 'array',
        fields: [
          {
            type: 'textarea',
            name: 'restriction',
          },
        ],
      }
    ),
    columnField(
      {
        labelSize: 'base',
        label: 'Requirements',
      },
      {
        name: 'requirements',
        type: 'array',
        label: false,
        admin: {
          initCollapsed: true,
          disableListColumn: true,
          disableBulkEdit: true,
        },
        fields: [
          {
            label: false,
            type: 'richText',
            name: 'note',
            editor: editorParagraphRichText,
          },
        ],
      }
    ),
    {
      type: 'ui',
      name: 'displayName',
      label: 'Name',
      admin: {
        components: {
          Cell: PathwayNameFieldPath,
        },
      },
    },
    {
      type: 'json',
      name: 'flags',
      defaultValue: [],
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (!data) return
        if (!data.id && req.routeParams?.id) {
          data.id = Number(req.routeParams?.id)
        }
      },
    ],
  },
}

export default Pathways
