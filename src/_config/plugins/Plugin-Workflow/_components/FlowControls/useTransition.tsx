import type { BtnFnProps } from '@/_config/plugins/Plugin-Workflow/_components/FlowControls/_types'
import { useForm } from '@payloadcms/ui'

/**
 * A press writes its intent into the transport fields and submits.
 *
 * The transition rides the save the editor was already making, so unsaved changes and the status move arrive together — which is what lets the hook mint the snapshot and then the transition that names it.
 */
export const useTransition = () => {
  const form = useForm()

  return async ({ to, actionKey, transitionNote }: BtnFnProps) =>
    await form.submit({
      overrides: { transitionTo: to, actionKey, transitionNote },
    })
}
