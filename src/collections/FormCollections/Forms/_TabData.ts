import { keyLabelPath } from '@/_components/blocks/Form/_lib/paths'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { RadioConfig } from '@/collections/_lib/Radio'

import { normalizeSelectOptions } from '@/lib/normalize'
import type { UnnamedTab } from 'payload'

export const DataTab: UnnamedTab = {
  label: 'Data',
  fields: [
    columnField(
      {},
      rowField(
        {},
        { type: 'text', name: 'title', localized: true, required: true },
        {
          type: 'select',
          name: 'formType',
          options: normalizeSelectOptions('subForm', 'form'),
          defaultValue: 'form',
        }
      ),
      {
        type: 'richText',
        name: 'introMessage',
        admin: {
          condition: (data) => data?.formType == 'form',
        },
      },
      {
        name: 'submitButtonLabel',
        type: 'text',
        localized: true,
        defaultValue: 'Submit',
        admin: {
          condition: (data) => data?.formType == 'form',
        },
      }
    ),
    columnField(
      {
        label: {
          text: 'Confirmation',
          type: 'lg',
        },
      },
      {
        type: 'checkbox',
        name: 'subformMessageOverride',
        label: 'Override Primary Form Confirmation?',
        admin: {
          condition: (data) => data?.formType == 'subForm',
        },
      },
      RadioConfig(
        'confirmationType',
        [
          { label: 'Message', value: 'message' },
          { label: 'Redirect', value: 'redirect' },
        ],
        {
          defaultValue: 'message',
          direction: 'horizontal',
          admin: {
            description:
              'Display an on-page message or redirect to a different page after submission.',
            condition: (data) => data?.formType == 'form' || data?.subformMessageOverride,
          },
        }
      ),
      {
        name: 'confirmationMessage',
        type: 'richText',
        admin: {
          condition: (data, s) =>
            s?.confirmationType === 'message'
            && (data?.formType == 'form' || data?.subformMessageOverride),
        },
        localized: true,
        required: true,
      },
      columnField(
        {},
        {
          name: 'redirect_url',
          type: 'text',
          label: 'URL to redirect to',
          required: true,
          admin: {
            condition: (data) =>
              (data?.formType == 'form' || data?.subformMessageOverride)
              && data.confirmationType === 'redirect',
          },
        }
      ),
      {
        name: 'emails',
        type: 'array',
        access: { read: ({ req: { user } }) => !!user },
        admin: {
          components: {
            RowLabel: {
              path: keyLabelPath,
              clientProps: {
                dataKey: 'subject',
              },
            },
          },
          condition: (data) => data?.formType == 'form' || data?.subformMessageOverride,
          description:
            'Use {{fieldName}} to reference submission values. {{*}} outputs all data, {{*:table}} formats it as an HTML table.',
        },
        fields: [
          columnField(
            {},
            {
              name: 'emailTo',
              type: 'text',
              label: 'Email To',
              admin: {
                placeholder: '"Name" <email@example.com>',
                width: '50%',
              },
            },
            rowField(
              {},
              {
                name: 'cc',
                type: 'text',
                label: 'CC',
              },
              {
                name: 'bcc',
                type: 'text',
                label: 'BCC',
              }
            ),
            rowField(
              {},
              {
                name: 'replyTo',
                type: 'text',
                label: 'Reply To',
                admin: {
                  placeholder: '"Reply To" <reply-to@example.com>',
                  width: '50%',
                },
              },
              {
                name: 'emailFrom',
                type: 'text',
                label: 'Email From',
                admin: {
                  placeholder: '"From" <from@example.com>',
                  width: '50%',
                },
              }
            ),
            {
              name: 'subject',
              type: 'text',
              label: 'Subject',
              defaultValue: "You've received a new message.",
              localized: true,
              required: true,
            },
            {
              name: 'message',
              type: 'richText',
              label: 'Message',
              localized: true,
            }
          ),
        ],
      }
    ),
  ],
}
