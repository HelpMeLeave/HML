import { FILE_TYPE_OPTIONS } from '@/_components/blocks/Form/_lib/fileTypes'
import { blockLabelPath, rowLabelPath } from '@/_components/blocks/Form/_lib/paths'
import { columnField, rowField } from '@/collections/_fields/Flex'
import type { Block } from 'payload'
import { slugify } from 'payload/shared'
import { defaultValueField } from './_lib/defaultValueField'
import { fieldBase } from './_lib/fieldBase'
import { fieldColWithRequired } from './_lib/fieldColWithRequired'
import { fieldLabels } from './_lib/fieldLabels'
import { generalFieldBlockAdmin } from './_lib/generalFieldBlockAdmin'
import { labelField } from './_lib/labelField'
import { nameField } from './_lib/nameField'
import { placeholderField } from './_lib/placeholderField'
import { requiredField } from './_lib/requiredField'
import { rowDefaultValueField } from './_lib/rowDefaultValueField'
import { rowNameLabel } from './_lib/rowNameLabel'
import { rowWidthPlaceholder } from './_lib/rowWidthPlaceholder'
import { slugInterface } from './_lib/slugInterface'
import { widthField } from './_lib/widthField'

export const CBFieldBlock: Block = {
  slug: 'formFieldCheckbox',
  interfaceName: 'FormFieldCheckbox',
  admin: generalFieldBlockAdmin,
  fields: fieldColWithRequired(
    rowDefaultValueField('checkbox'),
    nameField({
      admin: { hidden: true },
      hooks: { beforeChange: [({ blockData }) => slugify(blockData?.label)] },
    }),
    labelField()
  ),
  labels: fieldLabels('checkbox'),
}

export const CBGroupFieldBlock: Block = {
  ...fieldBase('checkbox group'),
  admin: generalFieldBlockAdmin,
  fields: fieldColWithRequired(rowNameLabel, {
    type: 'array',
    name: 'options',
    fields: [
      columnField(
        {},
        requiredField(false, true),
        rowDefaultValueField('checkbox'),
        rowField(
          {},
          labelField({
            required: true,
          }),
          {
            type: 'text',
            name: 'value',
            required: true,
          }
        )
      ),
    ],
  }),
}

export const CountryFieldBlock: Block = {
  ...fieldBase('country'),
  admin: {
    group: 'Premade Fields',
    components: {
      Label: {
        path: blockLabelPath,
        clientProps: {
          title: 'Country Field',
        },
      },
    },
  },
  fields: [
    columnField(
      {},
      requiredField(),
      nameField({
        admin: { hidden: true },
        defaultValue: 'country',
      }),
      rowField({}, labelField(), widthField)
    ),
  ],
}

export const EmailFieldBlock: Block = {
  ...fieldBase('email'),
  admin: {
    group: 'General Fields',
    components: {
      Label: {
        path: blockLabelPath,
        clientProps: {
          title: 'E-Mail Field',
        },
      },
    },
  },
  fields: fieldColWithRequired(
    rowField(
      {},
      nameField({
        admin: { hidden: true },
        defaultValue: 'email',
      }),
      labelField({ defaultValue: 'E-Mail Address' }),
      widthField
    )
  ),
}

export const MessageFieldBlock: Block = {
  ...fieldBase('message'),
  admin: {
    group: 'Conditional & Layout Fields',
    disableBlockName: true,
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: false,
      required: true,
      admin: {
        className: '**:[.editor-container]:pb-0!',
      },
    },
  ],
}

export const NumberFieldBlock: Block = {
  ...fieldBase('number'),
  admin: generalFieldBlockAdmin,
  fields: [
    columnField(
      {},
      requiredField(),
      rowNameLabel,
      rowField({}, defaultValueField.number, widthField)
    ),
  ],
}

export const PronounsFieldBlock: Block = {
  ...slugInterface('pronouns'),
  admin: {
    group: 'Premade Fields',
    components: {
      Label: {
        path: blockLabelPath,
        clientProps: {
          title: 'Pronouns Field',
        },
      },
    },
  },
  fields: fieldColWithRequired(
    nameField({
      admin: { hidden: true },
      defaultValue: 'pronouns',
    }),
    rowField(
      {},
      labelField({
        defaultValue: 'Preferred Pronouns',
      }),
      widthField
    ),
    {
      type: 'text',
      name: 'defaultValue',
      hasMany: true,
      defaultValue: [],
      required: true,
      admin: {
        hidden: true,
      },
      validate: (val) => {
        return Array.isArray(val) ? true : 'Invalid'
      },
    }
  ),

  labels: {
    plural: 'Pronoun Fields',
    singular: 'Pronouns',
  },
}

export const RadioFieldBlock: Block = {
  ...fieldBase('radio'),
  admin: generalFieldBlockAdmin,
  fields: fieldColWithRequired(rowNameLabel, rowField({}, defaultValueField.text, widthField), {
    type: 'array',
    name: 'options',
    admin: {
      components: {
        RowLabel: rowLabelPath,
      },
    },
    fields: [
      rowField(
        {},
        labelField({
          required: true,
        }),
        {
          type: 'text',
          name: 'value',
          required: true,
        }
      ),
    ],
  }),
}

export const SelectFieldBlock: Block = {
  ...fieldBase('select'),
  admin: generalFieldBlockAdmin,
  fields: fieldColWithRequired(
    {
      type: 'checkbox',
      label: 'Can Select Multiple Options',
      name: 'hasMany',
    },
    rowNameLabel,
    rowField(
      {},
      {
        type: 'number',
        name: 'maxOptions',
        admin: {
          condition: (data, siblingData, { blockData }) => blockData.hasMany == true,
        },
      },
      {
        type: 'number',
        name: 'minOptions',
        admin: {
          condition: (data, siblingData, { blockData }) => {
            return blockData.hasMany == true
          },
        },
      }
    ),
    rowField({}, widthField, placeholderField({ defaultValue: 'Choose an option' })),
    {
      type: 'array',
      name: 'options',
      admin: {
        components: {
          RowLabel: {
            path: blockLabelPath,
          },
        },
      },
      fields: [
        rowField(
          {},
          labelField({
            required: true,
          }),
          {
            type: 'text',
            name: 'value',
            required: true,
            admin: {
              description: 'Lowercase, No Special Characters',
            },
            hooks: {
              beforeChange: [({ value }) => slugify(value)],
            },
          }
        ),
      ],
    }
  ),
}

export const SignatureFieldBlock: Block = {
  ...fieldBase('signature'),
  admin: {
    group: 'Premade Fields',
    disableBlockName: true,
  },
  fields: [
    requiredField(),
    {
      name: 'data',
      type: 'json',
      admin: {
        hidden: true,
      },
      defaultValue: {
        entry: null,
        url: null,
        type: null,
      },
    },
  ],
}

export const StateFieldBlock: Block = {
  ...fieldBase('state'),
  admin: {
    group: 'Premade Fields',
    components: {
      Label: {
        path: blockLabelPath,
        clientProps: {
          title: 'State Field',
        },
      },
    },
  },
  fields: [
    columnField(
      {},
      requiredField(),
      nameField({
        admin: { hidden: true },
        defaultValue: 'state',
      }),
      rowField({}, labelField(), widthField)
    ),
  ],
}

export const TextareaFieldBlock: Block = {
  ...fieldBase('textarea'),
  admin: generalFieldBlockAdmin,
  fields: fieldColWithRequired(rowNameLabel, rowWidthPlaceholder(), rowDefaultValueField('text')),
}

export const TextFieldBlock: Block = {
  ...fieldBase('text'),
  admin: generalFieldBlockAdmin,
  fields: fieldColWithRequired(rowNameLabel, rowWidthPlaceholder(), rowDefaultValueField('text')),
}

export const TimezoneFieldBlock: Block = {
  ...fieldBase('timezone'),
  admin: {
    group: 'Premade Fields',
    components: {
      Label: {
        path: blockLabelPath,
      },
    },
  },
  fields: [
    columnField(
      {},
      requiredField(),
      rowField(
        {},
        labelField({
          defaultValue: 'Timezone',
        }),
        widthField
      )
    ),
  ],
}

export const UploadFieldBlock: Block = {
  ...fieldBase('upload'),
  admin: generalFieldBlockAdmin,
  fields: [
    columnField({}, requiredField(), labelField(), {
      name: 'allowedFileTypes',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['image', 'pdf'],
      label: 'Allowed File Types',
      options: FILE_TYPE_OPTIONS,
    }),
  ],
}
