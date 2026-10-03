import type { Flow } from 'payload-workflow'

export type BtnFnProps = {
  to: Flow.STATUS
  actionKey?: string
  transitionNote?: string
}
