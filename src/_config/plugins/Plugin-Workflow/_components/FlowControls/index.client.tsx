'use client'

import { tFn } from '@/_config/i18n/'
import { type NewTranslationKeys, type NewTranslationObj } from '@/_config/i18n/_types'
import { createAllowanceCheck } from '@/_config/plugins/Plugin-Workflow/_components/FlowControls/createAllowanceCheck'
import { NoteDrawer } from '@/_config/plugins/Plugin-Workflow/_components/FlowControls/NoteDrawer'
import { useTransition } from '@/_config/plugins/Plugin-Workflow/_components/FlowControls/useTransition'
import FlowPill from '@/_config/plugins/Plugin-Workflow/_components/Pill'
import type {
  FlowButton,
  FlowPermissionAnswers,
} from '@/_config/plugins/Plugin-Workflow/_lib/parseFlow'
import { contentTypes } from '@/collections/ContentCollections/Content/_lib/conditions'
import type { tContentType } from '@/collections/ContentCollections/Content/_lib/types'
import type { WorkflowCollectionSlug } from '@/payload-types'
import { Button, SaveButton, useField, useTranslation } from '@payloadcms/ui'
import { usePathname, useSearchParams } from 'next/navigation'
import type { Flow } from 'payload-workflow'
import './style.scss'

const Btn = ({ button }: { button: FlowButton }) => {
  const { to, admin, btnStyle, btnLabel, ...props } = button
  const transition = useTransition()

  // An affordance that asks for a reason collects it first.
  if (admin?.requireNotes) return <NoteDrawer button={button} />

  return (
    <Button
      {...props}
      type='button'
      buttonStyle={btnStyle}
      onClick={async () => await transition({ to, actionKey: admin?.actionKey })}>
      {btnLabel}
    </Button>
  )
}

const checkCreatePage = ({
  idIsNull,
  slug,
}: {
  slug: WorkflowCollectionSlug
  idIsNull: boolean
}) => {
  const path = usePathname()
  const search = useSearchParams().get('type')

  return (
    idIsNull
    && slug == 'content'
    && path.includes('create')
    && contentTypes.includes(search as tContentType)
  )
}

const BtnWrapper = ({ ...props }: Props<'span'>) => <span {...props} />

/**
 * Renders whatever the flow offered from where the document sits.
 *
 * Nothing is derived here. The button set was worked out once at boot and arrives as data, so this picks the entry for the current status and filters it by what the server already decided this user may take.
 */
export const FlowControlsClient = ({
  permissions,
  buttons,
  slug,
  pillLabels,
  canCreate,
  idIsNull,
}: {
  slug: WorkflowCollectionSlug
  buttons: Record<Flow.STATUS, FlowButton[]>
  permissions: FlowPermissionAnswers
  pillLabels: Record<Flow.STATUS, string>
  canCreate: boolean
  idIsNull: boolean
}) => {
  const { value: from } = useField<Flow.STATUS>({ path: 'flow' })
  const { value: locked } = useField<boolean>({
    path: 'currentLifecycle.locked',
  })

  const allowedAllowance = createAllowanceCheck({ permissions, from })
  const isCreatePage = checkCreatePage({ idIsNull, slug })

  const { t, i18n } = useTranslation<NewTranslationObj, NewTranslationKeys>()

  if (isCreatePage && canCreate) {
    return (
      <span className='doc-controls__controls-top flow'>
        <span />
        <span className='flow-wrapper'>
          <SaveButton label={tFn('general:createNew', true)({ t, i18n })} />
        </span>
      </span>
    )
  }

  const showSaveButton = Boolean(locked) == false

  return (
    <span className='doc-controls__controls-top flow'>
      <FlowPill
        status={from}
        label={pillLabels[from]}
      />
      <span className='flow-wrapper'>
        {showSaveButton && <SaveButton />}
        <BtnWrapper
          style={{
            columnGap: '1rem',
            display: 'flex',
          }}>
          {(buttons[from] ?? [])
            .filter(({ to, admin }) => allowedAllowance({ to, actionKey: admin?.actionKey }))
            .map((button) => (
              <Btn
                key={[button.to, button.admin?.actionKey].join('-')}
                button={button}
              />
            ))}
        </BtnWrapper>
      </span>
    </span>
  )
}
