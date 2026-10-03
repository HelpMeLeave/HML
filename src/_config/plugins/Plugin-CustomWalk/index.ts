import { NavGroups } from '@/_config/_lib'
import { parseConfigs } from '@/_config/plugins/Plugin-CustomWalk/_lib'
import { customLayout } from '@/_config/plugins/Plugin-CustomWalk/customLayout'
import { mergeObj } from '@/lib/mergeObj'
import { deeplyNestKey } from '@/lib/nestObj'
import {
  type CollectionConfig,
  type CollectionSlug,
  type Field,
  type GlobalConfig,
  definePlugin,
} from 'payload'
import { fieldHasSubFields } from 'payload/shared'

const WalkConfigs = parseConfigs([customLayout])

const reportIssues = (checks: Record<string, unknown>) => {
  if (Object.values(checks).some((ea) => ea == 'undefined')) {
    console.log(['-'.repeat(10), 'WALKING CHECKS', '-'.repeat(10)].join(' '))
    Object.entries(checks).forEach(([k, v]) => v == 'undefined' && console.log(k))
  }
}

const WalkField = (
  field: Field,
  parentSidebar?: boolean
): { field: Field; hasSidebar: boolean } => {
  let hasSidebar = parentSidebar || field.admin?.position == 'sidebar'

  if (fieldHasSubFields(field)) {
    field.fields = field.fields.map((f) => {
      const walked = WalkField(f, hasSidebar)
      hasSidebar = hasSidebar || walked.hasSidebar
      return walked.field
    })
  }

  if (field.type == 'tabs') {
    field.tabs = field.tabs.map((tab) => {
      tab.fields = tab.fields.map((t) => {
        const walked = WalkField(t, hasSidebar)
        hasSidebar = hasSidebar || walked.hasSidebar
        return walked.field
      })
      return tab
    })
  }

  const walkers = [...(WalkConfigs[field.type] ?? []), ...(WalkConfigs.all ?? [])]

  walkers?.forEach((walker) => {
    const { check, action } = walker
    // @ts-ignore complex typing error
    if ((check && check(field)) || !check) {
      // @ts-ignore complex typing error
      action(field, hasSidebar)
    }
  })

  return { field, hasSidebar }
}

const walkCollections = (collection: CollectionConfig, sidebarCollections: CollectionSlug[]) => {
  let hasSidebar = false
  collection.fields = collection.fields.map((field) => {
    const walked = WalkField(field)
    hasSidebar = hasSidebar || walked.hasSidebar
    return walked.field
  })

  if (hasSidebar && !sidebarCollections.includes(collection.slug as CollectionSlug)) {
    sidebarCollections.push(collection.slug as CollectionSlug)
  }

  collection.admin = mergeObj(
    { ...collection.admin },
    deeplyNestKey('components', 'views', 'edit', 'api', 'tab', { condition: () => false })
  )

  const checks = { timestamps: typeof collection.timestamps }
  reportIssues(checks)

  collection.timestamps = typeof collection.timestamps != 'boolean' ? false : collection.timestamps

  return collection
}

const walkGlobals = (global: GlobalConfig, sidebarCollections: CollectionSlug[]) => {
  let hasSidebar = false
  global.fields = global.fields.map((field) => {
    const walked = WalkField(field)
    hasSidebar = hasSidebar || walked.hasSidebar
    return walked.field
  })

  if (hasSidebar && !sidebarCollections.includes(global.slug as CollectionSlug)) {
    sidebarCollections.push(global.slug as CollectionSlug)
  }

  return global
}

export const PluginWalk = definePlugin({
  order: 999,
  slug: 'customWalk',
  plugin: async ({ config }) => {
    const sidebarCollections = (config.custom?.sidebarCollections as CollectionSlug[]) ?? []

    if (config.custom?.walked == false) {
      config.collections = config.collections?.map((collection) =>
        walkCollections(collection, sidebarCollections)
      )
      config.globals = config.globals?.map((global) => walkGlobals(global, sidebarCollections))
    }

    config.custom = {
      ...config.custom,
      walked: true,
      sidebarCollections,
    }

    if (config.typescript?.schema) {
      config.typescript.schema.push((args) => {
        return {
          ...args.jsonSchema,
          definitions: {
            ...args.jsonSchema.definitions,
            DocumentGroup: { enum: [...NavGroups] },
          },
        }
      })
    }

    return config
  },
})
