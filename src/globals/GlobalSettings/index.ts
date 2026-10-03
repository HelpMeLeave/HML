import { editorParagraphRichText } from '@/_components/lexicals/nested'
import { is } from '@/access/is'
import { simpleLinkField } from '@/collections/_fields/LinkBase'
import { RichTextConfig } from '@/collections/_lib/RichText'
import { Tab, Tabs } from '@/collections/_lib/Tabs'
import { NavigationTabs } from '@/globals/GlobalSettings/NavTabs'
import type { GlobalConfig } from 'payload'

export const GlobalSettingsGlobalConfig: GlobalConfig = {
  slug: 'global-settings',
  access: { update: is().Role.Director },
  admin: {},
  fields: [
    Tabs(
      Tab('navigation', [NavigationTabs]).named(),
      Tab('announcementBanner', [
        { type: 'date', name: 'addedDate', required: true },
        simpleLinkField({ required: true }),
        RichTextConfig('banner', editorParagraphRichText, { required: true }),
      ]).named(),
      Tab('policies', [
        { type: 'richText', name: 'privacy', editor: editorParagraphRichText },
        { type: 'richText', name: 'cookie', editor: editorParagraphRichText },
        { type: 'richText', name: 'accessibility', editor: editorParagraphRichText },
      ]).named()
    ).field(),
  ],
}
