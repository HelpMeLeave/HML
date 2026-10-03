import type { ParamType } from '@/_components/views/Base/DocumentView'
import { toTitleCase } from '@/lib/textCasing'
import { SetStepNav, type StepNavItem } from '@payloadcms/ui'

export const UpdateStepNav = ({ params }: { params?: ParamType }) => {
  if (!params || !params.segments) return <></>

  const steps = params.segments.reduce(
    (acc, curr, i) => {
      const value = typeof curr === 'object' ? curr.value : curr
      const label = typeof curr === 'object' ? curr.label : curr

      acc.url += `/${value}`

      if (!label) {
        if (acc.items.length > 0) acc.items[acc.items.length - 1].url = acc.url
      } else {
        acc.items.push({
          url: i < params.segments!.length - 1 ? acc.url : undefined,
          label: toTitleCase(label),
        })
      }

      return acc
    },
    { url: '/admin', items: [] as StepNavItem[] }
  )

  return <SetStepNav nav={steps.items} />
}
