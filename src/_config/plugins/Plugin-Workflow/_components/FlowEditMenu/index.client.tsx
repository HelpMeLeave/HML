'use client'
import { useTransition } from '@/_config/plugins/Plugin-Workflow/_components/FlowControls/useTransition'
import { PopupList } from '@payloadcms/ui'
import './style.scss'

/**
 * Archive and Delete, for widths where the controls row is hidden.
 *
 * Both are ordinary statuses, so these should press the same way every other affordance does — writing `transitionTo` and submitting. Not wired yet: the flow config declares no edges into them, so there is nothing to press toward.
 */
export const FlowEditMenuClient = ({ remove }: { remove: boolean }) => {
  const action = useTransition()

  return (
    remove && (
      <>
        <PopupList.Button
          className='workflow'
          onClick={() => {}}>
          Unpublish
        </PopupList.Button>
        <PopupList.Button
          className='workflow'
          onClick={() => {
            action({ to: 'archived' })
          }}>
          Archive
        </PopupList.Button>
        <PopupList.Button
          className='workflow'
          onClick={() => {
            action({ to: 'deleted' })
          }}>
          Delete
        </PopupList.Button>
      </>
    )
  )
}
