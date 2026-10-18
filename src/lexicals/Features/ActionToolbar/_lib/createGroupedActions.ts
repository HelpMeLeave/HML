import type { ToolbarAction, ToolbarActionGroup } from '@/lexicals/Features/ActionToolbar/_types'
import { AllActions } from '@/lexicals/Features/ActionToolbar/AllActions'
import type { ResolvedClientFeatureMap } from '@payloadcms/richtext-lexical'
import { type LexicalEditor } from '@payloadcms/richtext-lexical/lexical'

const parseMap = (
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

export const GroupedActions = (featureMap: ResolvedClientFeatureMap) => {
  const actions = Object.entries(Object.groupBy(AllActions, (t) => t.toolbar))
    .map(([slug, grp]) => grp && parseMap(slug, grp, featureMap))
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
