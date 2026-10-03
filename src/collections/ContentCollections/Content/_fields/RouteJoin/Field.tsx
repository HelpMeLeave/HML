import { Link, TextInput } from '@payloadcms/ui'
import { EyeIcon } from 'lucide-react'
import type { JoinFieldServerProps } from 'payload'

const PreviewBtn = ({ url }: { url: string }) => (
  <Link
    id='doc-preview-btn'
    className='btn btn--style-none btn--size-xsmall btn--has-icon btn--align-icon-right btn--icon-style-without-border btn--no-margin btn--icon ml-auto'
    href={`/${url}?preview`}
    target='_blank'>
    <span className='btn__content'>
      preview
      <span className='btn__icon'>
        <EyeIcon className='icon' />
      </span>
    </span>
  </Link>
)

const RouteJoin = async (props: JoinFieldServerProps) => {
  if (props.data?.id) {
    const { docs, totalDocs } = await props.payload.find({
      collection: 'routes',
      where: {
        doc: {
          equals: props.data.id,
        },
      },
      req: props.req,
    })

    if (totalDocs == 1)
      return (
        <span>
          <TextInput
            value={docs[0].url}
            Label={
              <span className='slug-label-wrapper'>
                <label
                  className='field-label slug-label-wrapper--label'
                  htmlFor='field-route'>
                  Route URL
                </label>
                <PreviewBtn url={docs[0].url} />
              </span>
            }

            path='route'
            readOnly
          />
        </span>
      )
  }
}

export default RouteJoin
