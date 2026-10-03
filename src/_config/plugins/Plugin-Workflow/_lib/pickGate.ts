import type { Flow } from 'payload-workflow'

type GateMap<G> = Partial<Record<Flow.STATUS, Partial<Record<Flow.STATUS, G | Record<string, G>>>>>

// A gate is a function (server) or a boolean (client); only the keyed form is a plain object.
const isKeyed = <G>(gate: G | Record<string, G>): gate is Record<string, G> =>
  typeof gate == 'object' && gate !== null

/**
 * The gate an edge declares for one affordance. `undefined` means ungated.
 *
 * Shared by the server's check and the client's button filter so both resolve the same entry — they used to be written separately and the server stopped calling keyed gates.
 */
export const pickGate = <G>({
  permissions,
  from,
  to,
  actionKey,
}: {
  permissions: GateMap<G>
  from: Flow.STATUS
  to: Flow.STATUS
  actionKey?: string | null
}): G | undefined => {
  const gate = permissions[from]?.[to]

  // One button on the edge is answered directly; several are keyed by affordance.
  return gate === undefined ? undefined
    : isKeyed<G>(gate) ? gate[actionKey ?? to]
    : (gate as G)
}
