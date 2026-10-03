import { CheckboxConfig } from '@/collections/_lib/Checkbox'
import { DescriptionField, TitleField } from '@/collections/_lib/Text'
import { conditionFnBlock } from '@/lib/condition'
import type { Block } from 'payload'

export const VideoPlayerBlockConfig: Block = {
  slug: 'videoPlayer',
  interfaceName: 'VideoPlayerBlock',
  labels: {
    singular: 'Video Player',
    plural: 'Video Players',
  },

  admin: {
    images: {
      icon: {
        url: '/lexicalIcons/pageGroup.svg',
        alt: 'Video Player Block',
      },
    },
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description:
          'Enter a URL from the address bar (e.g. https://www.youtube.com/watch?v=cXR5HLodsT8)',
      },
    },
    TitleField({
      label: 'Video Title',
      required: true,
    }),
    DescriptionField({
      label: 'Video Description',
      required: false,
    }),
    {
      type: 'date',
      name: 'publishedDate',
      label: 'Published Date',
      required: false,
      defaultValue: new Date().toISOString(),
    },
    {
      name: 'clip',
      type: 'group',
      fields: [
        CheckboxConfig('enableClip', {
          label: 'Clip Video',
          required: false,
          defaultValue: false,
          virtual: true,
        }),
        {
          name: 'startTime',
          type: 'group',
          admin: {
            condition: conditionFnBlock({ key: 'enableClip' }).siblingDataTruthy,
          },
          fields: [
            {
              name: 'minutes',
              type: 'number',
              label: 'Minutes',
              required: true,
              min: 0,
            },
            {
              name: 'seconds',
              type: 'number',
              label: 'Seconds',
              required: true,
              min: 0,
              max: 59,
            },
          ],
        },
        {
          name: 'endTime',
          type: 'group',
          admin: {
            condition: conditionFnBlock({ key: 'enableClip' }).siblingDataTruthy,
          },
          fields: [
            {
              name: 'minutes',
              type: 'number',
              label: 'Minutes',
              required: true,
              min: 0,
            },
            {
              name: 'seconds',
              type: 'number',
              label: 'Seconds',
              required: true,
              min: 0,
              max: 59,
            },
          ],
        },
      ],
    },
  ],
}
