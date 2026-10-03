import { sanitizeUrl } from 'payload/shared'
import { replaceDoubleCurlys } from './replaceDoubleCurlys'

type Entry = { field: string; value: string }

type LexicalNode = {
  type: string
  children?: LexicalNode[]
  [key: string]: unknown
}

type LexicalData = {
  root?: { children?: LexicalNode[]; [key: string]: unknown }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4
const IS_SUBSCRIPT = 1 << 5
const IS_SUPERSCRIPT = 1 << 6

type Converter = {
  nodeTypes: string[]
  converter: (args: {
    converters: Converter[]
    node: LexicalNode
    parent: LexicalNode
    childIndex: number
    submissionData?: Entry[]
  }) => string | Promise<string>
}

async function convertNodesToHTML(
  converters: Converter[],
  nodes: LexicalNode[],
  parent: LexicalNode,
  submissionData?: Entry[]
): Promise<string> {
  const unknownConverter = converters.find((c) => c.nodeTypes.includes('unknown'))
  const results = await Promise.all(
    nodes.map(async (node, i) => {
      const converter = converters.find((c) => c.nodeTypes.includes(node.type))
      if (!converter) {
        if (unknownConverter) {
          return unknownConverter.converter({
            converters,
            node,
            parent,
            childIndex: i,
            submissionData,
          })
        }
        return '<span>unknown node</span>'
      }
      return converter.converter({ converters, node, parent, childIndex: i, submissionData })
    })
  )
  return results.join('')
}

const converters: Converter[] = [
  {
    nodeTypes: ['paragraph'],
    converter: async ({ converters, node, parent, submissionData }) => {
      const inner = await convertNodesToHTML(
        converters,
        node.children ?? [],
        { ...node, parent },
        submissionData
      )
      return `<p>${inner}</p>`
    },
  },
  {
    nodeTypes: ['text'],
    converter: ({ node, submissionData }) => {
      let text = escapeHtml(String(node.text ?? ''))
      if (submissionData) text = replaceDoubleCurlys(text, submissionData)
      const format = (node.format as number) ?? 0
      if (format & IS_BOLD) text = `<strong>${text}</strong>`
      if (format & IS_ITALIC) text = `<em>${text}</em>`
      if (format & IS_STRIKETHROUGH)
        text = `<span style="text-decoration:line-through">${text}</span>`
      if (format & IS_UNDERLINE) text = `<span style="text-decoration:underline">${text}</span>`
      if (format & IS_CODE) text = `<code>${text}</code>`
      if (format & IS_SUBSCRIPT) text = `<sub>${text}</sub>`
      if (format & IS_SUPERSCRIPT) text = `<sup>${text}</sup>`
      return text
    },
  },
  {
    nodeTypes: ['linebreak'],
    converter: () => '<br>',
  },
  {
    nodeTypes: ['link'],
    converter: async ({ converters, node, parent, submissionData }) => {
      const fields = node.fields as {
        linkType?: string
        url?: string
        newTab?: boolean
        doc?: { value?: { id?: unknown } }
      }
      const inner = await convertNodesToHTML(
        converters,
        node.children ?? [],
        { ...node, parent },
        submissionData
      )
      let href =
        fields?.linkType === 'custom' ? (fields?.url ?? '') : String(fields?.doc?.value?.id ?? '')
      if (submissionData) href = replaceDoubleCurlys(href, submissionData)
      const safeHref = escapeHtml(sanitizeUrl(href))
      const rel = fields?.newTab ? ' rel="noopener noreferrer" target="_blank"' : ''
      return `<a href="${safeHref}"${rel}>${inner}</a>`
    },
  },
  {
    nodeTypes: ['heading'],
    converter: async ({ converters, node, parent, submissionData }) => {
      const allowed = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
      const tag = allowed.has(String(node.tag)) ? String(node.tag) : 'h1'
      const inner = await convertNodesToHTML(
        converters,
        node.children ?? [],
        { ...node, parent },
        submissionData
      )
      return `<${tag}>${inner}</${tag}>`
    },
  },
  {
    nodeTypes: ['quote'],
    converter: async ({ converters, node, parent, submissionData }) => {
      const inner = await convertNodesToHTML(
        converters,
        node.children ?? [],
        { ...node, parent },
        submissionData
      )
      return `<blockquote>${inner}</blockquote>`
    },
  },
  {
    nodeTypes: ['list'],
    converter: async ({ converters, node, parent, submissionData }) => {
      const allowed = new Set(['ol', 'ul'])
      const tag = allowed.has(String(node.tag)) ? String(node.tag) : 'ul'
      const inner = await convertNodesToHTML(
        converters,
        node.children ?? [],
        { ...node, parent },
        submissionData
      )
      return `<${tag}>${inner}</${tag}>`
    },
  },
  {
    nodeTypes: ['listitem'],
    converter: async ({ converters, node, parent, submissionData }) => {
      const inner = await convertNodesToHTML(
        converters,
        node.children ?? [],
        { ...node, parent },
        submissionData
      )
      return `<li>${inner}</li>`
    },
  },
]

export async function serializeLexical(
  data: LexicalData,
  submissionData: Entry[]
): Promise<string> {
  if (data?.root?.children?.length) {
    return convertNodesToHTML(
      converters,
      data.root.children,
      data.root as LexicalNode,
      submissionData
    )
  }
  return ''
}
