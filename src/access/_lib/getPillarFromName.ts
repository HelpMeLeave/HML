import { PILLARS } from '@/lib/constants/PILLARS'
import { toTitleCase } from '@/lib/textCasing'

export const getPillarFromName = (pillar: string) =>
  PILLARS.find((p) => p.name == toTitleCase(pillar))
