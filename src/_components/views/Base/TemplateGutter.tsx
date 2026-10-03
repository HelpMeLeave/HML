import type { ParamType } from '@/_components/views/Base/DocumentView'
import { UpdateStepNav } from '@/_components/views/Base/StepNav'
import { cn } from '@/lib/cn'
import { Gutter } from '@payloadcms/ui'
import type { AdminViewServerProps, Params, PayloadRequest } from 'payload'

const Title = ({ title }: { title: ReactNode }) => {
  if (typeof title == 'string') {
    return <h1>{title}</h1>
  }
  return title
}

export const TemplateGutter = ({
  params,
  title,
  req,
  ...props
}: Partial<Omit<AdminViewServerProps, 'params'>> & {
  req?: PayloadRequest
  title?: ReactNode
  url?: string
  params?: Params | ParamType
} & Omit<Props, 'title'>) => {
  const baseClass =
    'view-'
    + req?.url
      ?.replace(/.+\/admin\//g, '')
      .split('/')
      .join('--')
  return (
    <Gutter className={baseClass}>
      <UpdateStepNav params={params as ParamType} />
      {title && (
        <div className='dashboard__title mx-auto mb-4 lg:max-w-4xl'>
          <Title title={title} />
        </div>
      )}
      <section
        {...props}
        className={cn('mx-auto flex flex-wrap gap-x-2 gap-y-12 lg:max-w-4xl', props.className)}
      />
    </Gutter>
  )
}
