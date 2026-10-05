'use client'

import type { LexicalEditorViewMap } from '@payloadcms/richtext-lexical'
import { baseAdmin, baseTheme } from './options'

const Views: LexicalEditorViewMap = {
  default: {
    nodes: {},
    admin: baseAdmin,
    lexical: {
      theme: {
        ...baseTheme,
        paragraph: 'text-body leading-[1.65]',
        'section-hgroup': 'leading-none border-l border-ui-200',
      },
      namespace: `rich-editor`,
    },
    filterFeatures: (features) => {
      const { blocks: _blocks, ...otherFeatures } = features
      return otherFeatures
    },
  },
  content: {
    nodes: {
      text: {
        createDOM: () => {
          const el = document.createElement('span')
          el.setAttribute('data-node', 'text')

          return el
        },
      },
      paragraph: {
        createDOM: () => {
          const el = document.createElement('p')
          el.setAttribute('data-node', 'p')
          el.className = 'SUP'
          return el
        },
      },
    },
    admin: baseAdmin,
    lexical: (defaultConfig) => ({
      ...defaultConfig,
      theme: {
        ...defaultConfig.theme,
        text: {
          ...defaultConfig.theme.text,
          underline: 'no-underline',
        },
        paragraph: 'leading-[1.65] text-body',
      },
    }),
  },
}

export default Views
