export const isHeadingLink = (link: Nullish<{ url: string } | string>) =>
  Boolean(link && (typeof link == 'string' ? link : link.url)[0] == '#')
