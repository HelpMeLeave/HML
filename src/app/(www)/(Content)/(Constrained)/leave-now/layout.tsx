import { CTA } from '~/components/CTA'
import { Divider } from '~/components/Divider'
import {
	Page,
	PageEyebrow,
	PageHeading,
	PageHGroup,
	PageSubtitle,
} from '~/components/Structure/Page'

const Layout = ({ children }: { children?: ReactNode }) => (
	<Page>
		<PageHGroup>
			<PageEyebrow>Escape Routes</PageEyebrow>
			<PageHeading>Help Me Leave NOW</PageHeading>
			<PageSubtitle>
				We know that many people need to leave quickly. We are here to help you explore your options
				and make a plan.
			</PageSubtitle>
		</PageHGroup>

		{children}

		<Divider />
		<CTA
			subtitle={
				<>
					Find verified country safety data and visa pathways that align with your needs using our
					Visa Explorer. We also have a growing library of resources and guides to get you started
					on your journey.
				</>
			}
			secondaryAction={{
				href: '/guides-resources',
				label: 'Browse the Library',
			}}
			primaryAction={{
				href: '/explorer',
				label: 'Explore Now',
			}}>
			Explore Your Options
		</CTA>
	</Page>
)

export default Layout
