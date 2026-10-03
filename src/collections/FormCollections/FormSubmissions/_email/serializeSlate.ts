import { sanitizeUrl } from 'payload/shared'
import { replaceDoubleCurlys } from './replaceDoubleCurlys'

type Entry = { field: string; value: string }

type SlateNode = {
  type?: string
  text?: string
  bold?: boolean
  italic?: boolean
  code?: boolean
  url?: string
  children?: SlateNode[]
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export function serializeSlate(children: SlateNode[] | undefined, submissionData: Entry[]): string {
  return (children ?? [])
    .map((node) => {
      if (node.text !== undefined) {
        let text = escapeHtml(node.text)
        if (submissionData) text = replaceDoubleCurlys(text, submissionData)
        text = `<span>${text}</span>`
        if (node.bold) text = `<strong>${text}</strong>`
        if (node.code) text = `<code>${text}</code>`
        if (node.italic) text = `<em>${text}</em>`
        return text
      }
      if (!node) return null
      const inner = serializeSlate(node.children, submissionData)
      switch (node.type) {
        case 'h1':
          return `<h1>${inner}</h1>`
        case 'h2':
          return `<h2>${inner}</h2>`
        case 'h3':
          return `<h3>${inner}</h3>`
        case 'h4':
          return `<h4>${inner}</h4>`
        case 'h5':
          return `<h5>${inner}</h5>`
        case 'h6':
          return `<h6>${inner}</h6>`
        case 'li':
          return `<li>${inner}</li>`
        case 'ol':
          return `<ol>${inner}</ol>`
        case 'ul':
          return `<ul>${inner}</ul>`
        case 'quote':
          return `<blockquote>${inner}</blockquote>`
        case 'link': {
          let href = escapeHtml(sanitizeUrl(node.url ?? ''))
          if (submissionData) href = replaceDoubleCurlys(href, submissionData)
          return `<a href="${href}">${inner}</a>`
        }
        default:
          return `<p>${inner}</p>`
      }
    })
    .filter(Boolean)
    .join('')
}
