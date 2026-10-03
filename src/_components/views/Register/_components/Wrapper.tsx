import { Gutter } from '@payloadcms/ui'

export const Wrapper = ({ children }: Props) => {
  return (
    <div className='collection-edit__main-wrapper'>
      <div className='collection-edit__main'>
        <div className='document-fields document-fields--no-sidebar'>
          <div className='document-fields__main'>
            <Gutter>
              <div className='render-fields document-fields__fields'>{children}</div>
            </Gutter>
          </div>
        </div>
      </div>
    </div>
  )
}
