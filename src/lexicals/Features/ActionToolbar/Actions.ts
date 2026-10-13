import { calloutType } from '@/lexicals/Features/_lib/nodeStates'
import { $getFirstItemInCurrentList } from '@/lexicals/Features/_lists/getFirstItemInCurrentList'
import { $getListAtCaret } from '@/lexicals/Features/_lists/getListAtCaret'
import { $getListItemAtCaret } from '@/lexicals/Features/_lists/getListItemAtCaret'
import type {
  ToolbarAction,
  ToolbarActionGroup,
  ToolbarActionItem,
} from '@/lexicals/Features/ActionToolbar/_types'
import { $getCalloutAtCaret } from '@/lexicals/Features/Callout/_lib'
import { $toggleTitled } from '@/lexicals/Features/ListTitleFeature'
import { $getPotentialListTitle } from '@/lexicals/Features/ListTitleFeature/_lib/getPotentialListTitle'
import { $getTitledListAtCaret } from '@/lexicals/Features/ListTitleFeature/_lib/getTitledListAtCaret'
import { $makeListTitle } from '@/lexicals/Features/ListTitleFeature/_lib/makeListTitle'
import { $addDetails } from '@/lexicals/Features/RichListItem/_lib/addDetails'
import { $isRichListItem, $removeDetails } from '@/lexicals/Features/RichListItem/nodes'
import {
  $getCover,
  $hgroupAtCaret,
  OPEN_COVER_DRAWER_COMMAND,
} from '@/lexicals/Features/SectionCover/_lib'
import { $getHeadingAtCaret } from '@/lexicals/Features/Structure/_lib'
import { fromCamelCase } from '@/lib/textCasing'
import type { ResolvedClientFeatureMap } from '@payloadcms/richtext-lexical'
import {
  $getState,
  $isParagraphNode,
  $setState,
  type LexicalEditor,
} from '@payloadcms/richtext-lexical/lexical'
import { $isListItemNode } from '@payloadcms/richtext-lexical/lexical/list'
import {
  ArrowDown,
  ArrowUp,
  BookOpenText,
  ImageMinus,
  ImagePlus,
  Lightbulb,
  List,
  ListMinus,
  ListPlus,
  ListStart,
  NotebookPenIcon,
  Siren,
  Trash,
  type LucideIcon,
} from 'lucide-react'

const Tlbr = (
  slug: string,
  grps: ToolbarActionGroup[],
  featureMap: ResolvedClientFeatureMap
): ToolbarAction => {
  const groups = grps.filter(({ features }) => features.some((f) => Boolean(featureMap.get(f))))
  const features = groups.flatMap((ea) => ea.features)

  const $getKeys = () => Object.fromEntries(groups.map((ea) => [ea.slug, ea.$getKey()]))
  const $visible = () => groups.some((f) => Boolean(f.$include()))

  return { slug, features, $visible, $getKeys, groups }
}

const createButtonGroup = (
  toolbar: string,
  opts: Pick<ToolbarActionGroup, 'entries' | '$getKey'> & {
    feature: string
  }
): ToolbarActionGroup => ({
  toolbar,
  slug: opts.feature,
  features: [opts.feature],
  $getKey: opts.$getKey,
  entries: opts.entries,
  type: 'buttons',
  $include: () => Boolean(opts.$getKey()),
})

const createEntry = (
  slug: string,
  opts: Omit<ToolbarActionItem, 'slug' | 'label' | 'isActive'> & {
    label?: string
    isActive?: ToolbarActionItem['isActive']
  }
): ToolbarActionItem => {
  const { label, isActive, Icon, $isEnabled, onSelect, hideIfDisabled } = opts
  return {
    slug,
    Icon,
    onSelect,
    $isEnabled,
    isActive: typeof isActive != 'undefined' ? isActive : () => false,
    label: label ? label : fromCamelCase(slug),
    hideIfDisabled: hideIfDisabled ? hideIfDisabled : undefined,
  }
}

const StructureGrp = createButtonGroup('headings', {
  feature: 'structure',
  $getKey: () => $getHeadingAtCaret()?.getKey(),
  entries: [
    createEntry('headingStyleUp', {
      label: 'Increase Level',
      Icon: ArrowUp,
      $isEnabled: () => Boolean($getHeadingAtCaret()?.nextHeadingStyle('up')),
      onSelect: (editor) => editor?.update(() => $getHeadingAtCaret()?.stepHeadingStyle('up')),
      hideIfDisabled: true,
    }),
    createEntry('headingStyleDown', {
      label: 'Decrease Level',
      Icon: ArrowDown,
      $isEnabled: () => Boolean($getHeadingAtCaret()?.nextHeadingStyle('down')),
      onSelect: (editor) => editor?.update(() => $getHeadingAtCaret()?.stepHeadingStyle('down')),
      hideIfDisabled: true,
    }),
    createEntry('removeHeading', {
      Icon: Trash,
      $isEnabled: () => Boolean($getHeadingAtCaret()?.getKey()),
      onSelect: (editor) => editor?.update(() => $getHeadingAtCaret()?.dissolve(true)),
    }),
  ],
})

const CoverGrp: ToolbarActionGroup = {
  toolbar: 'headings',
  features: ['section-cover'],
  slug: 'section-cover',
  type: 'buttons',
  $include: () => Boolean($hgroupAtCaret()),
  $getKey: () => $getCover($hgroupAtCaret())?.getKey() ?? null,
  entries: [
    {
      slug: 'addCoverImg',
      label: 'Add Cover Image',
      Icon: ImagePlus,
      isActive: () => false,
      $isEnabled: () => Boolean($getCover($hgroupAtCaret())) == false,
      onSelect: function (editor) {
        const key = editor?.getEditorState().read(() => $hgroupAtCaret()?.getKey())
        if (key) editor?.dispatchCommand(OPEN_COVER_DRAWER_COMMAND, key)
      },
      hideIfDisabled: true,
    },
    {
      slug: 'removeCoverImg',
      label: 'Remove Cover Image',
      Icon: ImageMinus,
      isActive: () => false,
      $isEnabled: () => Boolean($getCover($hgroupAtCaret())),
      onSelect: (editor) => editor?.update(() => $getCover($hgroupAtCaret())?.remove()),
      hideIfDisabled: true,
    },
  ],
}

const ListTitleAction: ToolbarActionGroup = createButtonGroup('lists', {
  feature: 'list-title',
  $getKey: () => $getFirstItemInCurrentList($getListAtCaret())?.getKey(),
  entries: [
    {
      slug: 'makeListTitle',
      label: 'Make List Title',
      Icon: ListStart,
      isActive: () => false,
      $isEnabled: () => {
        const list = $getListAtCaret()
        return (
          Boolean(list)
          && Boolean($getTitledListAtCaret()) == false
          && $isParagraphNode(list?.getPreviousSibling())
        )
      },
      onSelect: (editor) =>
        editor?.update(() => {
          const lead = $getPotentialListTitle()
          if (lead) $makeListTitle(lead)
        }),
      hideIfDisabled: true,
    },
    {
      slug: 'dissolveListTitle',
      label: 'Dissolve List Title',
      Icon: List,
      isActive: () => false,
      $isEnabled: () => Boolean($getTitledListAtCaret()),
      onSelect: (editor) =>
        editor?.update(() => {
          const list = $getTitledListAtCaret()
          if (list) $toggleTitled(list)
        }),
      hideIfDisabled: true,
    },
  ],
})

const RichListItemAction: ToolbarActionGroup = {
  toolbar: 'lists',
  slug: 'richListItem',
  features: ['rich-list-item'],
  $include: () => Boolean($getListItemAtCaret()),
  $getKey: () => {
    return $getListItemAtCaret()?.getKey()
  },
  type: 'buttons',
  entries: [
    {
      slug: 'addDetails',
      label: 'Create Rich List',
      Icon: ListPlus,
      isActive: () => false,
      $isEnabled: () => !$isRichListItem($getListItemAtCaret()),
      onSelect: (editor) =>
        editor?.update(() => {
          const item = $getListItemAtCaret()
          if (item && !$isRichListItem(item) && $isListItemNode(item)) $addDetails(item)
        }),
      hideIfDisabled: true,
    },
    {
      slug: 'removeDetails',
      label: 'Dissolve Rich List',
      Icon: ListMinus,
      isActive: () => false,
      $isEnabled: () => $isRichListItem($getListItemAtCaret()),
      onSelect: (editor) =>
        editor?.update(() => {
          const item = $getListItemAtCaret()
          if ($isRichListItem(item)) $removeDetails(item)
        }),
      hideIfDisabled: true,
    },
  ],
}

const calloutItem = ({ key, label, Icon }: { key: string; label: string; Icon: LucideIcon }) =>
  createEntry(key, {
    isActive: function () {
      const callout = $getCalloutAtCaret()
      if (!callout) return false
      return $getState(callout, calloutType) == key
    },
    $isEnabled: function () {
      const callout = $getCalloutAtCaret()
      if (!callout) return false
      return $getState(callout, calloutType) != key
    },
    Icon,
    label,
    onSelect: function (editor) {
      return editor?.update(() => {
        const callout = $getCalloutAtCaret()
        if (!callout) return
        $setState(callout, calloutType, key)
      })
    },
  })

const CalloutActionBase: ToolbarActionGroup = createButtonGroup('callout', {
  feature: 'callout',
  $getKey: () => $getCalloutAtCaret()?.getKey(),
  entries: [
    { key: 'note', label: 'Note', Icon: NotebookPenIcon },
    { key: 'tip', label: 'Good to know', Icon: Lightbulb },
    { key: 'urgent', label: 'Urgent', Icon: Siren },
    { key: 'case-study', label: 'Case study', Icon: BookOpenText },
  ].map(calloutItem),
})

export const AllActions: ToolbarActionGroup[] = [
  StructureGrp,
  CoverGrp,
  ListTitleAction,
  RichListItemAction,
  CalloutActionBase,
]

export const GroupedActions = (featureMap: ResolvedClientFeatureMap) => {
  const actions = Object.entries(Object.groupBy(AllActions, (t) => t.toolbar))
    .map(([slug, grp]) => grp && Tlbr(slug, grp, featureMap))
    .filter(Boolean) as ToolbarAction[]

  return {
    actions,
    $getVisibleToolbars: () =>
      actions.map((ea) => ({
        check: ea.$visible(),
        ...ea,
      })),
    $getVisible: () => actions.map((ea) => [ea.slug, ea.$visible()]).filter(Boolean),
    $getActualNode: (visible: Array<ToolbarAction & { check: boolean }>, editor: LexicalEditor) => {
      const nodeKeys = visible
        .filter((ck) => ck.check == true)
        .flatMap((grp) => Object.values(grp.$getKeys()).filter((v) => Boolean(v)))
        .filter(Boolean)

      if (nodeKeys.length > 0) {
        return nodeKeys[0] && editor.getElementByKey(nodeKeys[0])
      }
    },
  }
}
