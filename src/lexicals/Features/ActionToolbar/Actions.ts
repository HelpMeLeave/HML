import { calloutType } from '@/lexicals/Features/_lib/nodeStates'
import type {
  ToolbarAction,
  ToolbarActionGroup,
  ToolbarActionItem,
} from '@/lexicals/Features/ActionToolbar/_types'
// import { $getCalloutAtCaret } from '@/lexicals/Features/Callout/CalloutNode'
import { $getCalloutAtCaret } from '@/lexicals/Features/Callout/_lib'
// import {
//   $getListAfterPotentialTitle,
//   $getPotentialListTitle,
//   $makeListTitle,
// } from '@/lexicals/Features/ListTitleFeature'
import { $getListAfterPotentialTitle } from '@/lexicals/Features/ListTitleFeature/_lib/getListAfterPotentialTitle'
import { $getPotentialListTitle } from '@/lexicals/Features/ListTitleFeature/_lib/getPotentialListTitle'
import { $makeListTitle } from '@/lexicals/Features/ListTitleFeature/_lib/makeListTitle'
// import {
//   $addDetails,
//   $getListItemAtCaret,
//   $isRichListItem,
//   $removeDetails,
// } from '@/lexicals/Features/RichListItem/nodes'
import { $addDetails } from '@/lexicals/Features/RichListItem/_lib/addDetails'
import { $getListItemAtCaret } from '@/lexicals/Features/RichListItem/_lib/getListItemAtCaret'
import { $isRichListItem, $removeDetails } from '@/lexicals/Features/RichListItem/nodes'
import {
  $getCover,
  $hgroupAtCaret,
  OPEN_COVER_DRAWER_COMMAND,
} from '@/lexicals/Features/SectionCover/_lib'
// import { $getHeadingAtCaret } from '@/lexicals/Features/Structure/nodes'
import { $getHeadingAtCaret } from '@/lexicals/Features/Structure/_lib'
import { fromCamelCase } from '@/lib/textCasing'
import type { ResolvedClientFeatureMap } from '@payloadcms/richtext-lexical'
import { $getState, $setState, type LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowUp,
  Image,
  ImageMinus,
  ImagePlus,
  Lightbulb,
  ListMinus,
  ListPlus,
  ListStart,
  ListTree,
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
  const { label, isActive, Icon, $isEnabled, onSelect } = opts
  return {
    slug,
    Icon,
    onSelect,
    $isEnabled,
    isActive: typeof isActive != 'undefined' ? isActive : () => false,
    label: label ? label : fromCamelCase(slug),
  }
}

const StructureGrp = createButtonGroup('headings', {
  feature: 'structure',
  $getKey: () => $getHeadingAtCaret()?.getKey(),
  entries: [
    createEntry('headingStyleUp', {
      label: 'Style One Level Up',
      Icon: ArrowUp,
      $isEnabled: () => Boolean($getHeadingAtCaret()?.nextHeadingStyle('up')),
      onSelect: (editor) => editor?.update(() => $getHeadingAtCaret()?.stepHeadingStyle('up')),
    }),
    createEntry('headingStyleDown', {
      label: 'Style One Level Down',
      Icon: ArrowDown,
      $isEnabled: () => Boolean($getHeadingAtCaret()?.nextHeadingStyle('down')),
      onSelect: (editor) => editor?.update(() => $getHeadingAtCaret()?.stepHeadingStyle('down')),
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
  label: 'Cover Image',
  Icon: Image,
  slug: 'section-cover',
  type: 'dropdown',
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
    },
    {
      slug: 'removeCoverImg',
      label: 'Remove Cover Image',
      Icon: ImageMinus,
      isActive: () => false,
      $isEnabled: () => Boolean($getCover($hgroupAtCaret())),
      onSelect: (editor) => editor?.update(() => $getCover($hgroupAtCaret())?.remove()),
    },
  ],
}

const ListTitleAction: ToolbarActionGroup = createButtonGroup('lists', {
  feature: 'list-title',
  $getKey: () => $getListAfterPotentialTitle()?.getKey(),
  entries: [
    {
      slug: 'makeListTitle',
      label: 'Make List Title',
      Icon: ListStart,
      isActive: () => false,
      $isEnabled: (_editor) => true,
      onSelect: (editor) =>
        editor?.update(() => {
          const lead = $getPotentialListTitle()
          if (lead) $makeListTitle(lead)
        }),
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
  label: 'Rich List',
  Icon: ListTree,
  type: 'dropdown',
  entries: [
    {
      slug: 'addDetails',
      label: 'Add Details',
      Icon: ListPlus,
      isActive: () => false,
      $isEnabled: () => !$isRichListItem($getListItemAtCaret()),
      onSelect: (editor) =>
        editor?.update(() => {
          const item = $getListItemAtCaret()
          if (item && !$isRichListItem(item)) $addDetails(item)
        }),
    },
    {
      slug: 'removeDetails',
      label: 'Remove Details',
      Icon: ListMinus,
      isActive: () => false,
      $isEnabled: () => $isRichListItem($getListItemAtCaret()),
      onSelect: (editor) =>
        editor?.update(() => {
          const item = $getListItemAtCaret()
          if ($isRichListItem(item)) $removeDetails(item)
        }),
    },
  ],
}

const calloutItem = ({
  key,
  label,
  Icon,
}: {
  key: string
  label: string
  Icon: LucideIcon
}): ToolbarActionItem => ({
  slug: key,
  label,
  Icon: Icon,
  isActive: function () {
    const callout = $getCalloutAtCaret()
    if (!callout) return false
    return $getState(callout, calloutType) == this.slug
  },
  onSelect: function (editor) {
    return editor?.update(() => {
      const callout = $getCalloutAtCaret()
      if (!callout) return
      $setState(callout, calloutType, this.slug)
    })
  },
  $isEnabled: function () {
    return this.isActive() == false
  },
})

const CalloutActionBase: ToolbarActionGroup = {
  toolbar: 'callout',
  slug: 'changeType',
  features: ['callout'],
  $include: function () {
    return Boolean(this.$getKey())
  },
  $getKey: () => $getCalloutAtCaret()?.getKey(),
  type: 'dropdown',
  label: 'Change Type',
  Icon: ArrowLeftRight,
  entries: [
    calloutItem({ key: 'note', label: 'Note', Icon: NotebookPenIcon }),
    calloutItem({ key: 'tip', label: 'Tip', Icon: Lightbulb }),
    calloutItem({ key: 'urgent', label: 'Urgent', Icon: Siren }),
  ],
}

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
