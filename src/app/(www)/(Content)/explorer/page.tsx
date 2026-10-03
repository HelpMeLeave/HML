import { Main } from '@/components/Structure/Main'
import type { Country } from '@/payload-types'
import { getPayload } from '@/server/getPayload'
import { getIndicatorScores } from '@/server/queries/getIndicatorScores'
import type { Metadata } from 'next'
import { extractID } from 'payload/shared'
import { initCountries } from 'www/(Content)/explorer/_lib/initCountries'
import { parsePathway } from 'www/(Content)/explorer/_lib/parsePathway'
import type { ExplorerBase } from 'www/(Content)/explorer/_types'
import { Base } from 'www/(Content)/explorer/page.client'

export const metadata: Metadata = {
  title: 'Pathway Explorer',
  description:
    'Whether you have strict requirements or more flexibility, find your best options for safe countries to go to.',
}

const ExplorerPage = async () => {
  const payload = await getPayload()
  const { docs: initPathways } = await payload.find({
    collection: 'v1Pathways',
    select: {
      country: true,
      countryName: true,
      jobRequired: true,
      age1830: true,
      age60plus: true,
      digitalWorker: true,
      education: true,
      entrepreneur: true,
      monthlyIncome: true,
      travellingWithKids: true,
    },
    populate: {
      countries: {
        name: true,
      },
    },
    pagination: false,
  })
  const pathways = Object.groupBy(initPathways, (p) => extractID(p.country))

  const scores = await getIndicatorScores(payload, {
    countries: Object.keys(initCountries),
    indicators: ['lgbtq-safety', 'trans-safety', 'racial-equality', 'un-member'],
  })
  const scoreOf = (country: string, indicator: string) =>
    scores.find((row) => row.country == country && row.indicator == indicator)

  const countries = Object.entries(initCountries).reduce(
    (allCountries, [countryId, countryData]) => {
      const countryPathways = pathways[countryId]?.reduce(
        (finalPathway, pathway) => {
          const { name } = pathway.country as Country
          if (pathway.country as Country) {
            countryData.name = name
          }
          return parsePathway(finalPathway, pathway)
        },
        {
          monthlyIncome: false,
          jobRequired: false,
          age1830: false,
          age60plus: false,
          travellingWithKids: false,
          education: false,
          digitalWorker: false,
          entrepreneur: false,
        }
      )
      if (countryPathways) {
        const racism = scoreOf(countryId, 'racial-equality')

        allCountries[countryId] = {
          ...countryData,
          community: {
            prideSafety: scoreOf(countryId, 'lgbtq-safety')?.pass === true,
            transSafety: scoreOf(countryId, 'trans-safety')?.pass === true,
            racismRank: racism ? Number(racism.value) : null,
            unMember: scoreOf(countryId, 'un-member')?.pass === true,
          },
          pathways: countryPathways,
        }
      }

      return allCountries
    },
    {} as ExplorerBase
  )

  return (
    <Main
      data-layout='full'
      data-page='explorer'
      className='h-fill relative mx-auto mb-auto flex w-full flex-col justify-center pb-8'>
      <Base countries={countries} />
    </Main>
  )
}

export default ExplorerPage
