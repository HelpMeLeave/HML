import type { ParamType } from '@/_components/views/Base/DocumentView'
import { UpdateStepNav } from '@/_components/views/Base/StepNav'
import { cn } from '@/lib/cn'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import type { BasePayload, InitPageResult, Params } from 'payload'

export const Template = ({
  initPageResult: { req, locale, permissions, visibleEntities },
  params,
  payload,
  searchParams,
  title,
  ...props
}: Props<'section'> & {
  initPageResult: InitPageResult
  params: Params | undefined
  payload: BasePayload
  searchParams: Params | undefined
  title: string
}) => {
  const baseClass =
    'view-'
    + req.url
      ?.replace(/.+\/admin\//g, '')
      .split('/')
      .join('--')
  return (
    <DefaultTemplate
      className={baseClass}
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user || undefined}
      visibleEntities={visibleEntities}>
      <Gutter className={''}>
        <UpdateStepNav params={params as ParamType} />
        <div className='dashboard__title mb-4'>
          <h1>{title}</h1>
        </div>
        <section
          {...props}
          className={cn(
            'mx-auto flex max-w-full flex-wrap justify-start gap-x-2 gap-y-12 lg:max-w-4xl',
            props.className
          )}
        />
      </Gutter>
    </DefaultTemplate>
  )
}
