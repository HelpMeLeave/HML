import type { Config, TemplateBlock } from '@/payload-types'
import { type FeatureProviderServer, type SerializedBlockNode } from '@payloadcms/richtext-lexical'

export type FeaturesInput = FeatureProviderServer<unknown, AnySafe, AnySafe>

type Blocks<K extends keyof Config['blocks']> = Config['blocks'][K]
export type BlockConfig = Blocks<keyof Config['blocks']> | TemplateBlock
export type BlockNodeTypes = SerializedBlockNode<BlockConfig>
