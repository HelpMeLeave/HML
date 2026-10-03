import { type OnSaveHookProps, onSave } from '@/_config/plugins/Plugin-Workflow/_hooks/onSave'

export const setBaseHooks = (props: OnSaveHookProps) => {
  const { collection } = props

  collection.hooks = {
    ...collection.hooks,
    beforeChange: [...(collection.hooks?.beforeChange ?? []), onSave(props)],
  }
}
