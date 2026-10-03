import type { CTABlock } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type CTABtn =
  | {
      text: string
      href: string
      // from resolveLinkNode, so the editor's new-tab choice and off-site links decide it
      target: string
    }
  | {
      text: string
      action: Valid<CTABlock['primaryButton']>['action']
      // filled on the server from ctaActionRenders; the CTA renders it as-is
      element?: ReactNode
    }

export type CTAProps = {
  title: ReactNode
  subtitle?: ReactNode
  primaryButton: CTABtn
  secondaryButton?: CTABtn
}

export type ResolvedCTA = Omit<CTABlock, 'title' | 'primaryButton' | 'useTemplate'> & {
  title: Valid<CTABlock['title']>
  primary: Valid<CTABlock['primaryButton']>
  secondary: CTABlock['secondaryButton']
}

export type NonTemplatePreviewProps = {
  titleState: SerializedEditorState
  subtitleState: SerializedEditorState
  primary: CTABlock['primaryButton']
  secondary: CTABlock['secondaryButton']
}
