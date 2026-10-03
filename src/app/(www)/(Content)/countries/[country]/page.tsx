import { SmLeftRail } from '@/app/(www)/_components/LeftRail'
import { Skeleton } from '@/app/(www)/_components/Skeleton'
import { Main, MainEyebrow, MainHeading, MainHGroup } from '@/components/Structure/Main'
import { toTitleCase } from '@/lib/textCasing/toTitleCase'
import { getPayload } from '@/server/getPayload'
import { getIndicatorScores, scoreHue } from '@/server/queries/getIndicatorScores'
import { Suspense } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { CommunityBadges } from 'www/(Content)/countries/[country]/_components/CommunityBadges'
import { MatchingPathways } from 'www/(Content)/countries/[country]/_components/MatchingPathways'
import { Stats } from 'www/(Content)/countries/[country]/_components/Stats'
import { countryMetadata } from 'www/(Content)/countries/[country]/_lib/metadata'
import { countryStaticParams } from 'www/(Content)/countries/[country]/_lib/staticParams'

export const generateStaticParams = countryStaticParams

export const generateMetadata = countryMetadata

// How a value is written on the page, from the indicator's kind and format
// ToDo: swap for the getIndicatorScores row type once it's settled
const formatValue = (row: ToDo) => {
  const value = Number(row.value)
  if (row.kind == 'yes-no') return value == 1 ? 'Yes' : 'No'
  if (row.kind == 'rank') return String(value)
  if (row.format == 'whole') return String(Math.round(value))
  if (row.format == 'percent') return `${value.toFixed(2)}%`
  return value.toFixed(2)
}

const PageData = async ({ params }: Slug<{ country: string }> & {}) => {
  const { country: countryParam } = await params
  const code = countryParam.toUpperCase()

  // Everything this page shows about the country comes from the indicator data in one query
  const payload = await getPayload()
  const [country, scores] = await Promise.all([
    payload.findByID({
      collection: 'countries',
      id: code,
      select: { name: true },
      depth: 0,
      disableErrors: true,
    }),
    getIndicatorScores(payload, { countries: [code] }),
  ])

  // Worked out here on the server: scoreHue sits beside the SQL, which must stay out of the client bundle
  const countryStats = scores
    .filter((row) => row.useOnCountryPage === true)
    .map((row) => ({
      title: String(row.name),
      stat: formatValue(row),
      hue: scoreHue(Number(row.score)),
    }))

  if (country && scores.length > 0) {
    return (
      <>
        <SmLeftRail>
          <CommunityBadges scores={scores} />
        </SmLeftRail>
        <Main
          data-page={`country-${countryParam}`}
          data-layout='constrained'>
          <MainHGroup>
            <MainEyebrow className='flex gap-2'>
              <CommunityBadges scores={scores} />
            </MainEyebrow>
            <MainHeading>{toTitleCase(country.name)}</MainHeading>
          </MainHGroup>
          <MatchingPathways country={country} />
          {countryStats.length > 0 && <Stats countryStats={countryStats} />}
        </Main>
      </>
    )
  }
}

export default async ({ params }: Slug<{ country: string }> & {}) => (
  <Fragment>
    <Suspense fallback={<Skeleton />}>
      <PageData params={params} />
    </Suspense>
  </Fragment>
)
