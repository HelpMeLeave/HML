import { Main } from '@/components/Structure/Main'
import type { Metadata } from 'next'
import { getMapCountries } from 'www/_lib/getMapCountries'
import { WorldMap } from './Base'

export const metadata: Metadata = {
  title: 'World Map',
  description: 'Interactive map to explore country profiles.',
}

const Map = async () => {
  const countries = await getMapCountries()

  return (
    <Main
      className='no-footer'
      data-layout='full'
      data-page='map'>
      <WorldMap countries={countries} />
    </Main>
  )
}

export default Map
