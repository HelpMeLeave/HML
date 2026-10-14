import type { Tag } from '@/payload-types'

export type Item = {
  url: string
  text: string
  target: '_self' | '_blank'
  author?: string | null
  preview?: string
  type?: string
  category?: string
}

export type QueryIds = Record<Tag['title'], { ids: number[]; titles: string[] }>

export type CardBageProps = {
  isInternal: boolean
  category: Nullish<string | 'guide' | 'how to' | 'press release' | 'news & commentary'>
}

export type ItemCardProps = {
  isInternal: boolean
  item: Item
  i: number
  className?: Props['className']
}
