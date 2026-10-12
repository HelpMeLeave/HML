import type { SerializedBlockNode, SerializedInlineBlockNode } from '@payloadcms/richtext-lexical'
import { type FeatureProviderServer } from '@payloadcms/richtext-lexical'
import type { JSXConverter } from '@payloadcms/richtext-lexical/react'
import type { JsonObject } from 'payload'

export type FeaturesInput = FeatureProviderServer<unknown, AnySafe, AnySafe>

export type InlineConverter<T extends JsonObject = JsonObject> = JSXConverter<
  SerializedInlineBlockNode<T>
>

export type BlockConverterProps<T extends JsonObject = JsonObject> = {
  node: SerializedBlockNode<T>
}
