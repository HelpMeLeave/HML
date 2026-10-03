import { ctaActionOptions } from '@/_components/blocks/CTA/actions'
import { columnField, rowField } from '@/collections/_fields/Flex'
import {
  LinkFieldDoc,
  LinkFieldLinkType,
  LinkFieldNewTab,
  LinkFieldUrl,
} from '@/collections/_fields/LinkBase'
import { cn } from '@/lib/cn'
import { conditionFnBlock } from '@/lib/condition'
import type { Field, FieldHookArgs, GroupField, RadioField, SelectField } from 'payload'

export const FieldButton = ({
  name,
  withActions,
  ...opts
}: Partial<GroupField> & {
  name: string
  // only the primary button can open a modal; without this the button is always a link
  withActions?: boolean
}): Field => {
  const isLink = (sData: { actionType?: string } | undefined) =>
    !withActions || sData?.actionType == 'link'

  const actionTypeField: RadioField = {
    type: 'radio',
    name: 'actionType',
    options: ['link', 'action'],
    defaultValue: 'link',
    admin: {
      layout: 'vertical',
    },
  }

  const actionField: SelectField = {
    type: 'select',
    options: ctaActionOptions,
    name: 'action',
    required: true,
    admin: { condition: (_data, sData) => sData?.actionType == 'action' },
  }

  // builds its own link fields below (they sit beside the action fields), so it only needs a plain group
  return {
    type: 'group',
    ...opts,
    name,
    admin: {
      ...opts.admin,
      className: cn(opts.admin?.className, 'mb-6!'),
      hideGutter: true,
      style: {
        ...opts.admin?.style,
        // @ts-expect-error custom css variables
        '--direction': 'column',
      },
    },
    hooks: {
      beforeChange: [
        ({ value }: FieldHookArgs) => {
          if (value.actionType == 'action') {
            value = {
              ...value,
              url: null,
              linkType: null,
              newTab: undefined,
              doc: null,
            }
            return value
          }
        },
      ],
    },
    fields: [
      rowField({}, ...(withActions ? [actionTypeField] : []), {
        ...LinkFieldLinkType(),
        admin: {
          layout: 'vertical',
          condition: (_data, sData) => isLink(sData),
        },
      }),
      {
        type: 'text',
        name: 'text',
        label: 'Button Label',
        required: name == 'primaryButton' ? true : opts.required,
        admin: {
          condition:
            withActions ? conditionFnBlock({ key: 'actionType' }).siblingDataTruthy : undefined,
        },
      },
      ...(withActions ? [actionField] : []),
      columnField(
        { admin: { condition: (_data, sData) => isLink(sData) } },
        { ...LinkFieldDoc({ collections: ['routes', 'externalResources'] }), required: true },
        LinkFieldUrl,
        LinkFieldNewTab
      ),
    ],
  }
}
