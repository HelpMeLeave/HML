import { HeadingFeature } from '@payloadcms/richtext-lexical'
import { H4Feature } from '../Features/H4Feature'
import { SectionFeature } from '../Features/SectionFeature'
import { StructureFeature } from '../Features/Structure'
import { SubSectionFeature } from '../Features/SubSectionFeature/feature.server'

export const HeadingFeatures = [
  HeadingFeature({ enabledHeadingSizes: [] }),
  H4Feature(),
  StructureFeature(),
  SectionFeature(),
  SubSectionFeature(),
]
