import { type TrackFilter, trackDecision } from '@/_config/plugins/Plugin-Workflow/track/filter'
import type { Field, Tab } from 'payload'
import type { FlowOptionsCollector } from 'payload-workflow'
import {
  fieldAffectsData,
  fieldHasMaxDepth,
  fieldHasSubFields,
  fieldIsPresentationalOnly,
  fieldIsVirtual,
  fieldShouldBeLocalized,
  fieldSupportsMany,
  tabHasName,
} from 'payload/shared'

const shouldSkip = (field: Field) => {
  return (
    field.custom?.track == false
    || field.type == 'join'
    || fieldIsVirtual(field)
    || fieldIsPresentationalOnly(field)
  )
}

export const mirrorFields = ({
  fields,
  collector,
  filter,
  localizedParent,
  path,
  hasSidebarFields,
}: {
  fields: Field[]
  collector: FlowOptionsCollector
  filter?: TrackFilter
  localizedParent?: boolean
  path: string
  hasSidebarFields: boolean[]
}): Field[] =>
  fields.reduce((mirrored, field) => {
    if (field.admin && 'position' in field.admin) {
      hasSidebarFields.push(field.admin.position == 'sidebar')
    }
    if (shouldSkip(field)) return mirrored

    const name = 'name' in field ? field.name : undefined

    const localized =
      (
        fieldShouldBeLocalized({
          field,
          parentIsLocalized: Boolean(localizedParent),
        }) && 'localized' in field
      ) ?
        field.localized
      : undefined

    /** A field stripped to what storage needs. Anything not listed here is deliberately not carried over. */
    const snap = <F extends Field>(base: F, props?: Partial<Record<keyof F, F[keyof F]>>) =>
      ({
        name: 'name' in base ? base.name : undefined,
        type: base.type,
        ...(localized && { localized }),
        ...(fieldHasMaxDepth(base) && { maxDepth: base.maxDepth }),
        ...(fieldSupportsMany(base) && { hasMany: base.hasMany }),
        ...props,
      }) as F

    // Per-field copy, so a `keepAll` inside one branch doesn't leak the cleared filter onto its siblings.
    let fieldFilter = filter

    if (fieldFilter && name) {
      const decision = trackDecision(`${path}${name}`, fieldFilter)
      if (decision == 'drop') return mirrored
      if (decision == 'keepAll') fieldFilter = undefined
    }

    if (field.type == 'tabs') {
      mirrored.push(
        ...mirrorTabs({
          tabs: field.tabs,
          collector,
          fieldFilter,
          path,
          hasSidebarFields,
        })
      )
      return mirrored
    }

    if (field.type == 'relationship' || field.type == 'upload') {
      mirrored.push(snap(field, { relationTo: field.relationTo }))
      return mirrored
    }

    if (field.type == 'select' || field.type == 'radio') {
      collector[`${path}${field.name}`] = field.options
      mirrored.push(snap(field, { type: 'text' }))
      return mirrored
    }

    if (field.type == 'blocks') {
      mirrored.push(snap(field, { type: 'json' }))
      return mirrored
    }

    if (field.type == 'richText') {
      mirrored.push(snap(field, { editor: field.editor }))
      return mirrored
    }

    if (field.type == 'array' || field.type == 'group') {
      // A named container is a path of its own, so descend with it prefixed.
      if (fieldAffectsData(field)) {
        mirrored.push(
          snap(field, {
            fields: mirrorFields({
              fields: field.fields,
              collector,
              filter: fieldFilter,
              localizedParent: localized,
              path: `${path}${field.name}.`,
              hasSidebarFields,
            }),
          })
        )
        return mirrored
      }

      // Unnamed, so it holds no data — flatten its children up to this level.
      mirrored.push(
        ...mirrorFields({
          fields: field.fields,
          collector,
          filter: fieldFilter,
          localizedParent: localized,
          path,
          hasSidebarFields,
        })
      )
      return mirrored
    }

    // Rows and collapsibles. Presentational containers with real fields underneath.
    if (fieldHasSubFields(field)) {
      mirrored.push(
        ...mirrorFields({
          fields: field.fields,
          collector,
          filter: fieldFilter,
          localizedParent: localized,
          path,
          hasSidebarFields,
        })
      )
      return mirrored
    }

    mirrored.push(snap(field))

    return mirrored
  }, [] as Field[])

/** Named tabs become groups, since a snapshot has no use for tabs but does need the nesting they imply. Unnamed tabs flatten. */
const mirrorTabs = ({
  tabs,
  collector,
  fieldFilter,
  path,
  hasSidebarFields,
}: {
  tabs: Tab[]
  collector: FlowOptionsCollector
  fieldFilter: TrackFilter | undefined
  path: string
  hasSidebarFields: boolean[]
}): Field[] =>
  tabs.flatMap((tab) => {
    if (!tabHasName(tab))
      return mirrorFields({
        fields: tab.fields,
        collector,
        filter: fieldFilter,
        localizedParent: tab.localized,
        path,
        hasSidebarFields,
      })

    let tabFilter = fieldFilter

    if (tabFilter) {
      const decision = trackDecision(`${path}${tab.name}`, tabFilter)
      if (decision == 'drop') return []
      if (decision == 'keepAll') tabFilter = undefined
    }

    return {
      type: 'group',
      name: tab.name,
      localized: tab.localized,
      fields: mirrorFields({
        fields: tab.fields,
        collector,
        filter: tabFilter,
        localizedParent: tab.localized,
        path: `${path}${tab.name}.`,
        hasSidebarFields,
      }),
    } as Field
  })
