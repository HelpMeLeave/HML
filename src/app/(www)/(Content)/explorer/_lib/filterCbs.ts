import type {
  ExplorerBase,
  ExplorerCommunityData,
  ExplorerCountry,
  ExplorerPathwayData,
  tDrawerFilterGroup,
} from 'www/(Content)/explorer/_types'

type HandleByFN<K> = (country: ExplorerCountry, key: keyof K) => boolean

const handleByPathway: HandleByFN<ExplorerPathwayData> = (country, key) =>
  Boolean(country?.pathways[key] === true)

const handleByCommunity: HandleByFN<ExplorerCommunityData> = (country, key) =>
  Boolean(country?.community[key] === true)

export const filterCbs: tDrawerFilterGroup[] = [
  {
    group: 'For my livelihood, I...',
    items: [
      {
        label: 'Have a monthly income',
        dataKey: 'monthlyIncome',
        matches: (country: ExplorerBase[string]) => handleByPathway(country, 'monthlyIncome'),
      },
      {
        label: 'Will need help to find a job',
        dataKey: 'jobRequired',
        matches: (country: ExplorerBase[string]) => handleByPathway(country, 'jobRequired'),
      },
      {
        label: 'Can work digitally from anywhere',
        dataKey: 'digitalWorker',
        matches: (country: ExplorerBase[string]) => handleByPathway(country, 'digitalWorker'),
      },
    ],
  },
  {
    group: 'I am....',
    items: [
      {
        label: 'Black',
        dataKey: 'black',
        matches: (country: ExplorerBase[string]) => (country.community.racismRank ?? 0) > 0,
      },
      {
        label: 'LGBTQIA+',
        dataKey: 'prideSafety',
        matches: (country: ExplorerBase[string]) => handleByCommunity(country, 'prideSafety'),
      },
      {
        label: 'Trans, Intersex or Non-binary',
        dataKey: 'transSafety',
        matches: (country: ExplorerBase[string]) => handleByCommunity(country, 'transSafety'),
      },
      {
        label: 'Disabled',
        dataKey: '',
        matches: () => true,
      },
      {
        label: '18-30 years old',
        dataKey: 'age1830',
        matches: (country: ExplorerBase[string]) => handleByPathway(country, 'age1830'),
      },
      {
        label: '60+ years old',
        dataKey: 'age60plus',
        matches: (country: ExplorerBase[string]) => handleByPathway(country, 'age60plus'),
      },
    ],
  },
  {
    group: 'My Family...',
    items: [
      {
        label: 'Includes Kid(s)',
        dataKey: 'travellingWithKids',
        matches: (country: ExplorerBase[string]) => handleByPathway(country, 'travellingWithKids'),
      },
    ],
  },
]
