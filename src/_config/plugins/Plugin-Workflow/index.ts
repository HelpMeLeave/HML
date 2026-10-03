import { hasWorkflowConfig, isBuilt } from '@/_config/plugins/Plugin-Workflow/_lib/is'
import { type FlowPermissions, parseFlow } from '@/_config/plugins/Plugin-Workflow/_lib/parseFlow'
import { lockFields } from '@/_config/plugins/Plugin-Workflow/collections/_lib'
import { setBase } from '@/_config/plugins/Plugin-Workflow/collections/base'
import { buildRecordCollection } from '@/_config/plugins/Plugin-Workflow/collections/record'
import { workflowSchema } from '@/_config/plugins/Plugin-Workflow/collections/schema'
import type { WorkflowRecordSlug } from '@/payload-types'
import { type CollectionConfig, type Config, definePlugin } from 'payload'
import type { WorkflowCollection } from 'payload-workflow'

/** Every collection's declared gates, lifted out of its flow so the config could cross to the client. Keyed by slug, then by the status a transition leaves, then by the affordance. */
export const pluginWorkflowPermissions: Record<string, FlowPermissions> = {}

export const PluginWorkflow = definePlugin({
  slug: 'workflow',
  order: 999,
  plugin: ({ config, plugins: _plugins }) => {
    const { collections } = config
    if (!collections) return config

    const baseSlugs: string[] = []

    const built = collections.flatMap(
      (collection): Array<CollectionConfig | WorkflowCollection.Config> => {
        if (!hasWorkflowConfig(collection) || isBuilt(collection)) return [collection]

        baseSlugs.push(collection.slug)

        const baseSlug = collection.slug
        const recordSlug: WorkflowRecordSlug = `${baseSlug}-record` as WorkflowRecordSlug
        const { flow, locksAt } = collection.custom.workflow

        const { initStatus, statusOptions, pillLabels, buttons, permissions } = parseFlow(flow)

        pluginWorkflowPermissions[baseSlug] = permissions

        const { recordCollection, trackedPaths, hasSidebarFields } = buildRecordCollection({
          collection,
          recordSlug,
        })

        collection.fields = lockFields(collection.fields)

        setBase({
          collection,
          initStatus,
          statusOptions,
          pillLabels,
          recordSlug,
          locksAt,
          baseSlug,
          buttons,
          permissions,
          trackedPaths,
          hasSidebarFields,
        })

        collection.custom.workflow._init = true

        return [collection as WorkflowCollection.Config, recordCollection]
      }
    )

    return {
      ...config,
      collections: built,
      typescript: {
        ...config.typescript,
        schema: [...(config.typescript?.schema ?? []), ...workflowSchema({ baseSlugs })],
      },
    } as Config
  },
})
