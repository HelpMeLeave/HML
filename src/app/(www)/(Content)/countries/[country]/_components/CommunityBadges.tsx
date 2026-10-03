import { BlackPower } from '@/components/Flag/BlackPower'
import { PrideFlag } from '@/components/Flag/PrideFlag'
import { TransFlag } from '@/components/Flag/TransFlag'
import { UNFlag } from '@/components/Flag/UN'
import { Fragment } from 'react/jsx-runtime'

// Badges are drawn as flags; an indicator with any other icon has no badge art yet, so it shows nothing
const flags = {
  pride: PrideFlag.Icon,
  trans: TransFlag.Icon,
  un: UNFlag.Icon,
  blm: BlackPower.Icon,
}

// A badge shows when the indicator is ticked as a Community Badge and this country passes it
export const CommunityBadges = ({
  scores,
}: {
  // ToDo: swap for the getIndicatorScores row type once it's settled
  scores: ToDo[]
}) => (
  <Fragment>
    {scores
      .filter((row) => row.communityBadge === true && row.pass === true)
      .map((row) => {
        const Flag = flags[String(row.icon) as keyof typeof flags]
        return Flag ?
            <Flag
              key={String(row.indicator)}
              className='size-10 text-2xl'
            />
          : null
      })}
  </Fragment>
)
