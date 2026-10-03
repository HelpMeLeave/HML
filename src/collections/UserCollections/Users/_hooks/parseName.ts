import { toTitleCase } from '@/lib/textCasing'

export const parseName = ({ ...props }) => {
  const { data } = props
  if (!data) return
  if (!data.name) {
    Object.assign(data, {
      name: toTitleCase(data.firstName ?? data.username),
    })
  }

  return data
}
