import { ImportDrawer } from '@/collections/DataCollections/Indicators/Import/index.client'
import type { BeforeDocumentControlsServerProps } from 'payload'

// Server half: loads the real country codes once, so the preview checks against the same list the endpoint uses.
const IndicatorImport = async ({ payload }: BeforeDocumentControlsServerProps) => {
  const { docs } = await payload.find({
    collection: 'countries',
    select: {},
    depth: 0,
    pagination: false,
  })

  return <ImportDrawer countryCodes={docs.map(({ id }) => String(id))} />
}

export default IndicatorImport
