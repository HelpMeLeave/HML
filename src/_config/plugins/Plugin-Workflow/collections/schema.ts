import { FLOW_STATUSES } from '@/_config/plugins/Plugin-Workflow/_lib/constants'
import type { JSONSchema4 } from 'json-schema'

/** An object schema where every listed property is required. */
const object = (properties: Record<string, JSONSchema4>): JSONSchema4 => ({
  type: 'object',
  additionalProperties: false,
  required: Object.keys(properties),
  properties,
})

const refs = (slugs: string[]) =>
  object(Object.fromEntries(slugs.map((slug) => [slug, { $ref: `#/definitions/${slug}` }])))

/**
 * What the plugin adds to the generated types.
 *
 * Payload hands each of these the schema it is about to write types from, so the plugin's vocabulary comes out of `payload-types` rather than being maintained beside it. Two families: the collections that opted in, and the record collection each one produced.
 *
 * The slug enums are the point. Derived here they name only the collections that actually exist, which a template literal over `CollectionSlug` cannot do — that generates a slug for every collection in the config, most of which have no record collection behind them.
 */
export const workflowSchema = ({ baseSlugs }: { baseSlugs: string[] }) => [
  ({ jsonSchema }: { jsonSchema: JSONSchema4 }) => {
    const recordSlugs = baseSlugs.map((slug) => `${slug}-record`)

    Object.assign(jsonSchema, {
      definitions: {
        ...jsonSchema.definitions,
        WorkflowCollections: refs(baseSlugs),
        WorkflowCollectionSlug: { enum: baseSlugs },
        WorkflowRecordCollections: refs(recordSlugs),
        WorkflowRecordSlug: { enum: recordSlugs },
        WorkflowFlowStatus: { enum: FLOW_STATUSES },
        // Base slug to its record slug, so one resolves the other in types as well as at runtime.
        WorkflowRecordFor: object(
          Object.fromEntries(
            baseSlugs.map((slug) => [slug, { $ref: `#/definitions/${slug}-record` }])
          )
        ),
      },
    })

    return jsonSchema
  },
]
