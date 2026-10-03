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
