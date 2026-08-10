import {
	Page,
	PageEyebrow,
	PageHeading,
	PageHGroup,
	PageSubtitle,
} from '~/components/Structure/Page'

type TemplateKeys = 'heading' | 'children'
type OptionalTemplateKeys = 'eyebrow' | 'subtitle'

export const PageTemplate = ({
	eyebrow,
	heading,
	subtitle,
	children,
}: Required<Record<TemplateKeys, ReactNode>>
	& Partial<Record<OptionalTemplateKeys, ReactNode>>) => {
	return (
		<Page>
			<PageHGroup>
				{eyebrow && <PageEyebrow>{eyebrow}</PageEyebrow>}
				<PageHeading>{heading}</PageHeading>
				{subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
			</PageHGroup>
			{children}
		</Page>
	)
}
