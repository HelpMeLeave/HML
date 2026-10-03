export type NavChild = {
  url: string
  text: string
  summary: string
}

export type NavSection = {
  slug: string
  url?: string
  text: string
  summary?: string
  children: NavChild[]
}
