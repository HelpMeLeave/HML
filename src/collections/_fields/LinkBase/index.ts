import type {
  LinkFieldDocOptions,
  LinkFieldNameOptions,
} from '@/collections/_fields/LinkBase/_types'
import { RadioConfig } from '@/collections/_lib/Radio'
import { conditionFn } from '@/lib/condition'
import type { CheckboxField, GroupField, RelationshipField, RowField, TextField } from 'payload'
import type { Collection } from 'payload-types'

export const LinkFieldUrl: TextField = {
  type: 'text',
  name: 'url',
  label: 'URL',
  admin: {
    width: '50%',
    style: {
      flexGrow: 1,
    },
    condition: conditionFn<Collection, AnySafe>({
      key: 'linkType',
      equals: 'custom',
    }).siblingDataEq,
  },
  hooks: {
    beforeChange: [
      ({ siblingData }) => {
        if (siblingData?.linkType === 'internal') return null
      },
    ],
  },
}

export const LinkFieldDoc = (options?: LinkFieldDocOptions): RelationshipField =>
  ({
    type: 'relationship',
    name: 'doc',
    relationTo: options?.collections ?? ['routes', 'externalResources'],
    label: 'Link To',
    admin: {
      width: '50%',
      appearance: options?.appearance ?? 'drawer',
      condition: conditionFn<Collection, AnySafe>({
        key: 'linkType',
        equals: 'internal',
      }).siblingDataEq,
      ...options?.admin,
    },
    filterOptions: options?.filterOptions,
  }) as RelationshipField

export const LinkFieldLinkType = (required?: boolean) =>
  RadioConfig(
    'linkType',
    [
      { label: 'Internal Link', value: 'internal' },
      { label: 'External Link', value: 'custom' },
    ],
    {
      direction: 'vertical',
      required: required ?? true,
      defaultValue: 'custom',

      admin: {
        width: '130px',
        style: {
          //@ts-expect-error custom css variables
          '--minWidth': '120px',
        },
        className: 'field-radio:pl-2 w-40 min-w-40 **:text-nowrap [--minWidth:120px]',
      },
    }
  )

export const LinkFieldNewTab: CheckboxField = {
  name: 'newTab',
  type: 'checkbox',
  label: 'Open in New Tab',
  admin: {
    condition: conditionFn<Collection, AnySafe>({
      key: 'linkType',
      equals: 'internal',
    }).siblingDataEq,
  },
}

export const LinkFieldName = (nameField: LinkFieldNameOptions): TextField => ({
  ...nameField,
  type: 'text',
  name: nameField?.name,
  required: nameField?.required ?? true,
  admin: {
    width: '50%',
    style: {
      flexGrow: 1,
    },
  },
})

export const simpleLinkField = (args?: {
  required?: boolean
  layout?: 'vertical' | 'horizontal'
  docOptions?: LinkFieldDocOptions
  nameField?: LinkFieldNameOptions
  admin?: GroupField['admin']
}): RowField | GroupField => {
  const { docOptions, required, layout, admin } = args ?? {}

  return {
    type: 'group',
    label: docOptions?.label ?? false,
    admin: {
      ...(docOptions?.admin as GroupField['admin']),
      ...admin,
      hideGutter: true,
    },
    fields: [
      {
        type: !layout || layout == 'vertical' ? 'group' : 'row',
        fields: [
          args?.nameField && LinkFieldName(args.nameField),
          LinkFieldUrl,
          LinkFieldDoc(docOptions),
        ].filter(Boolean),
        admin: {
          hideGutter: true,
        } as GroupField['admin'],
      } as RowField | GroupField,
      LinkFieldLinkType(required),
      LinkFieldNewTab,
    ],
    ...(docOptions?.name ? { name: docOptions.name } : {}),
  }
}
