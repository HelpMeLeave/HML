import { PluginWalk } from '@/_config/plugins/Plugin-CustomWalk'
import { SEOConfig } from '@/_config/plugins/Plugin-SEO'
import { upload } from '@/_config/plugins/Plugin-Uploads'
import { PluginWorkflow } from '@/_config/plugins/Plugin-Workflow'

export const plugins = [...upload, SEOConfig, PluginWorkflow(), PluginWalk()]
