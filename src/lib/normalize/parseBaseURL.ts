export const parseBaseURL = (...segments: string[]) =>
  '/' + segments.filter(Boolean).join('/').replace(/^\/+/, '')
